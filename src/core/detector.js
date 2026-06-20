import fs from "fs"
import path from "path"
import { parsePackageJson, parseComposerJson, parseReadme, parseEnvExample } from "./parser.js"

export function detectFrameworks(detectorConfig, context) {
  const detected = []
  const root = process.cwd()

  for (const [framework, config] of Object.entries(detectorConfig)) {
    const indicators = config.indicators || []
    let matched = false

    for (const indicator of indicators) {
      if (indicator.includes(":")) {
        const [file, keyword] = indicator.split(":")
        if (context.files.some(f => f === file || f.endsWith("/" + file) || f.endsWith("\\" + file))) {
          try {
            const content = fs.readFileSync(path.join(root, file), "utf-8")
            if (content.includes(`"${keyword}"`) || content.includes(`'${keyword}'`)) {
              matched = true
              break
            }
          } catch (err) {
          }
        }
      } else {
        const fileMatch = context.files.some(f => 
          f === indicator || f.endsWith("/" + indicator) || f.endsWith("\\" + indicator)
        )
        const folderMatch = context.folders.some(f => 
          f === indicator || f.includes("/" + indicator) || f.includes("\\" + indicator)
        )
        
        if (fileMatch || folderMatch) {
          matched = true
          break
        }
      }
    }

    if (matched) {
      detected.push(framework)
    }
  }

  return detected
}

export function detectArchitecture(detectorConfig, context) {
  const results = []

  for (const [arch, config] of Object.entries(detectorConfig)) {
    const required = config.required || []
    const optional = config.optional || []

    const requiredMatch = required.every(item => {
      const normalized = item.replace(/\//g, "\\")
      return context.folders.some(f => 
        f === item || f === normalized || f.endsWith("\\" + item) || f.endsWith("\\" + normalized)
      ) || context.files.some(f => 
        f === item || f === normalized || f.endsWith("\\" + item) || f.endsWith("\\" + normalized)
      )
    })

    if (requiredMatch) {
      const optionalMatch = optional.filter(item => {
        const normalized = item.replace(/\//g, "\\")
        return context.folders.some(f => 
          f === item || f === normalized || f.endsWith("\\" + item) || f.endsWith("\\" + normalized)
        ) || context.files.some(f => 
          f === item || f === normalized || f.endsWith("\\" + item) || f.endsWith("\\" + normalized)
        )
      }).length

      results.push({
        type: arch,
        confidence: requiredMatch ? 0.5 + (optionalMatch / (optional.length || 1) * 0.5) : 0,
        description: config.description
      })
    }
  }

  results.sort((a, b) => b.confidence - a.confidence)

  return results.length > 0 ? results[0].type : "unknown"
}

export function extractKnowledge(extractorConfig, context) {
  const root = process.cwd()
  const knowledge = {
    commands: [],
    modules: [],
    routes: [],
    stores: [],
    services: [],
    dependencies: [],
    scripts: [],
    readme: {},
    envVars: []
  }

  const packageInfo = parsePackageJson(root)
  const composerInfo = parseComposerJson(root)
  const readmeInfo = parseReadme(root)
  const envInfo = parseEnvExample(root)

  knowledge.dependencies = [
    ...packageInfo.dependencies,
    ...packageInfo.devDependencies,
    ...composerInfo.dependencies,
    ...composerInfo.devDependencies
  ]
  knowledge.scripts = packageInfo.scripts
  knowledge.readme = readmeInfo

  if (readmeInfo.commands && readmeInfo.commands.length > 0) {
    knowledge.commands = [
      ...new Set([...knowledge.commands, ...readmeInfo.commands.map(c => c.replace("proctx ", ""))])
    ]
  }
  knowledge.envVars = envInfo.variables

  const parsers = extractorConfig.parsers || {}

  if (parsers.commands) {
    for (const commandPath of parsers.commands.paths) {
      const normalized = commandPath.replace(/\//g, "\\")
      if (fs.existsSync(path.join(root, normalized))) {
        const files = fs.readdirSync(path.join(root, normalized))
        knowledge.commands = files
          .filter(f => f.endsWith(".js") || f.endsWith(".ts"))
          .map(f => f.replace(/\.(js|ts)$/, ""))
      }
    }
  }

  if (parsers.router) {
    for (const routerPath of parsers.router.paths) {
      const normalized = routerPath.replace(/\//g, "\\")
      if (fs.existsSync(path.join(root, normalized))) {
        const files = fs.readdirSync(path.join(root, normalized))
        knowledge.routes = files
          .filter(f => f.endsWith(".js") || f.endsWith(".ts"))
          .map(f => f.replace(/\.(js|ts)$/, ""))
      }
    }
  }

  if (parsers.stores) {
    for (const storePath of parsers.stores.paths) {
      const normalized = storePath.replace(/\//g, "\\")
      if (fs.existsSync(path.join(root, normalized))) {
        const files = fs.readdirSync(path.join(root, normalized))
        knowledge.stores = files
          .filter(f => f.endsWith(".js") || f.endsWith(".ts"))
          .map(f => f.replace(/\.(js|ts)$/, ""))
      }
    }
  }

  if (parsers.services) {
    for (const servicePath of parsers.services.paths) {
      const normalized = servicePath.replace(/\//g, "\\")
      if (fs.existsSync(path.join(root, normalized))) {
        const files = fs.readdirSync(path.join(root, normalized))
        knowledge.services = files
          .filter(f => f.endsWith(".js") || f.endsWith(".ts"))
          .map(f => f.replace(/\.(js|ts)$/, ""))
      }
    }
  }

  if (parsers.features) {
    for (const featurePath of parsers.features.paths) {
      const normalized = featurePath.replace(/\//g, "\\")
      if (fs.existsSync(path.join(root, normalized))) {
        const dirs = fs.readdirSync(path.join(root, normalized), { withFileTypes: true })
        knowledge.modules = dirs
          .filter(d => d.isDirectory())
          .map(d => d.name)
      }
    }
  }

  return knowledge
}
