import fs from "fs"
import path from "path"
import { isSensitiveFile, scanForSecrets } from "../utils/security.js"

export function parsePackageJson(rootPath) {
  const pkgPath = path.join(rootPath, "package.json")
  
  if (!fs.existsSync(pkgPath)) {
    return { dependencies: [], devDependencies: [], scripts: [] }
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))

  const dependencies = Object.keys(pkg.dependencies || {})
  const devDependencies = Object.keys(pkg.devDependencies || {})
  const scripts = Object.keys(pkg.scripts || {})

  return {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    dependencies,
    devDependencies,
    scripts,
    type: pkg.type
  }
}

export function parseComposerJson(rootPath) {
  const composerPath = path.join(rootPath, "composer.json")
  
  if (!fs.existsSync(composerPath)) {
    return { dependencies: [], devDependencies: [] }
  }

  const composer = JSON.parse(fs.readFileSync(composerPath, "utf-8"))

  const dependencies = Object.keys(composer.require || {})
  const devDependencies = Object.keys(composer["require-dev"] || {})

  return {
    name: composer.name,
    description: composer.description,
    dependencies,
    devDependencies
  }
}

export function parseReadme(rootPath) {
  const readmePaths = ["README.md", "README", "readme.md", "Readme.md"]
  
  for (const readmePath of readmePaths) {
    const fullPath = path.join(rootPath, readmePath)
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8")
      
      const lines = content.split("\n")
      const title = lines.find(l => l.startsWith("# "))?.replace(/^#+\s*/, "").trim()
      
      let description = ""
      const descMatch = content.match(/^>\s*(.+)$/m)
      if (descMatch) {
        description = descMatch[1].trim()
      } else {
        const descriptionMatch = content.match(/##?\s*(?:Description|About|Overview)\s*\n+([\s\S]*?)(?:\n##|$)/i)
        if (descriptionMatch) {
          description = descriptionMatch[1].trim().split("\n").filter(l => l.trim() && !l.startsWith("#"))[0] || ""
        }
      }

      const features = []
      
      const featureMatch = content.match(/##?\s*Features?\s*\r?\n+([\s\S]*?)(?:\r?\n##|$)/i)
      if (featureMatch) {
        const featureLines = featureMatch[1].split(/\r?\n/).filter(l => l.trim().startsWith("-") || l.trim().startsWith("*"))
        features.push(...featureLines.map(l => l.replace(/^[\s\-\*]+/, "").trim()))
      }

      const commands = []
      const allCmdMatches = content.matchAll(/```(?:bash)?\r?\n(proctx\s+\w+)/g)
      for (const m of allCmdMatches) {
        if (!commands.includes(m[1].trim())) {
          commands.push(m[1].trim())
        }
      }

      const supportedAgents = []
      const agentsMatch = content.match(/##?\s*Supported Agents?\s*\r?\n+([\s\S]*?)(?:\r?\n##|$)/i)
      if (agentsMatch) {
        const agentLines = agentsMatch[1].split(/\r?\n/).filter(l => l.trim().startsWith("-") && l.trim().length > 2)
        supportedAgents.push(...agentLines.map(l => l.replace(/^[\s\-\*]+/, "").trim()).filter(a => a))
      }

      return {
        title,
        description,
        features,
        commands,
        supportedAgents
      }
    }
  }

  return { title: "", description: "", features: [] }
}

export function parseEnvExample(rootPath) {
  const envPath = path.join(rootPath, ".env.example")
  
  if (!fs.existsSync(envPath)) {
    return { variables: [] }
  }

  const content = fs.readFileSync(envPath, "utf-8")
  const lines = content.split(/\r?\n/)
  
  const variables = lines
    .filter(l => l.trim() && !l.trim().startsWith("#"))
    .map(l => l.split("=")[0].trim())
    .filter(v => v)

  return { variables }
}

export function parseFileImports(filePath) {
  if (!fs.existsSync(filePath)) {
    return { imports: [], exports: [], warnings: [] }
  }

  if (isSensitiveFile(filePath)) {
    return { 
      imports: [], 
      exports: [], 
      warnings: [{ 
        file: filePath, 
        type: "sensitive_file", 
        message: "File contains sensitive data and was skipped" 
      }] 
    }
  }

  const content = fs.readFileSync(filePath, "utf-8")
  const warnings = scanForSecrets(content, filePath)
  
  const imports = []
  const exports = []

  const importMatches = content.matchAll(/import\s+(?:{[^}]+}|[\w]+|\*\s+as\s+[\w]+)\s+from\s+['"](.*)['"]/g)
  for (const match of importMatches) {
    imports.push(match[1])
  }

  const exportMatches = content.matchAll(/export\s+(?:default\s+)?(?:function|class|const|let|var)\s+([\w]+)/g)
  for (const match of exportMatches) {
    exports.push(match[1])
  }

  return { imports, exports, warnings }
}
