import fs from "fs"
import path from "path"

export function ensureGitignore(rootPath) {
  const gitignorePath = path.join(rootPath, ".gitignore")
  
  const requiredEntries = [
    ".ai/",
    ".opencode/"
  ]

  let gitignoreContent = ""
  
  if (fs.existsSync(gitignorePath)) {
    gitignoreContent = fs.readFileSync(gitignorePath, "utf-8")
  }

  const lines = gitignoreContent.split(/\r?\n/)
  const existingEntries = new Set(lines.map(l => l.trim()))

  let needsUpdate = false
  const linesToAdd = []

  for (const entry of requiredEntries) {
    if (!existingEntries.has(entry) && !existingEntries.has(entry.replace(/\/$/, ""))) {
      linesToAdd.push(entry)
      needsUpdate = true
    }
  }

  if (needsUpdate) {
    const separator = gitignoreContent && !gitignoreContent.endsWith("\n") ? "\n" : ""
    const comment = "\n# ProCtx - AI Context Management\n"
    const newContent = gitignoreContent + separator + comment + linesToAdd.join("\n") + "\n"
    
    fs.writeFileSync(gitignorePath, newContent, "utf-8")
    
    return {
      updated: true,
      added: linesToAdd
    }
  }

  return {
    updated: false,
    added: []
  }
}

export function createGitignoreIfMissing(rootPath) {
  const gitignorePath = path.join(rootPath, ".gitignore")
  
  if (!fs.existsSync(gitignorePath)) {
    const defaultContent = `# ProCtx - AI Context Management
.ai/
.opencode/

# Dependencies
node_modules/
vendor/

# Build outputs
dist/
build/
.next/

# Environment
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo
`
    fs.writeFileSync(gitignorePath, defaultContent, "utf-8")
    return { created: true }
  }

  return { created: false }
}
