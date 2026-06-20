// src/core/writer.js
import fs from "fs"
import path from "path"

export function writeJSON(filePath, data) {
  const fullPath = path.join(process.cwd(), filePath)

  fs.mkdirSync(path.dirname(fullPath), { recursive: true })

  fs.writeFileSync(
    fullPath,
    JSON.stringify(data, null, 2),
    "utf-8"
  )
}