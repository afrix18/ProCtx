// src/core/file-scanner.js
import fs from "fs"
import path from "path"

export function scanProject(root = process.cwd()) {
  const files = []
  const folders = new Set()

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        folders.add(entry.name)
        walk(fullPath)
      } else {
        files.push(entry.name)
      }
    }
  }

  walk(root)

  return {
    files,
    folders: Array.from(folders)
  }
}