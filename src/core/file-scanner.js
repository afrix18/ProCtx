import fs from "fs"
import path from "path"
import { isSensitiveFile } from "../utils/security.js"

export function scanProject(root = process.cwd()) {
  const files = []
  const folders = new Set()
  const skippedSensitive = []

  const ignore = [
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    "vendor",
    ".ai"
  ]

  function walk(dir, relativePath = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (ignore.includes(entry.name)) continue

      const fullPath = path.join(dir, entry.name)
      const relPath = relativePath ? path.join(relativePath, entry.name) : entry.name

      if (entry.isDirectory()) {
        folders.add(relPath)
        walk(fullPath, relPath)
      } else {
        if (isSensitiveFile(relPath)) {
          skippedSensitive.push(relPath)
        } else {
          files.push(relPath)
        }
      }
    }
  }

  walk(root)

  return {
    files,
    folders: Array.from(folders),
    skippedSensitive
  }
}