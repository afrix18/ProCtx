// src/core/context-builder.js
import { scanProject } from "./file-scanner.js"

export function buildContext() {
  const fsState = scanProject()

  return {
    files: fsState.files,
    folders: fsState.folders
  }
}