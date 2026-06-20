import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

import { buildContext } from "../core/context-builder.js"
import { evaluateRules } from "../core/rule-engine.js"
import { writeJSON } from "../core/writer.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function bootstrap() {
  const root = process.cwd()

  const context = buildContext()

  const specsDir = path.join(__dirname, "../specs")

  const frameworkSpec = JSON.parse(
    fs.readFileSync(
      path.join(specsDir, "framework-detector.json"),
      "utf-8"
    )
  )

  const archSpec = JSON.parse(
    fs.readFileSync(
      path.join(specsDir, "architecture-detector.json"),
      "utf-8"
    )
  )

  const framework = evaluateRules(frameworkSpec, context)
  const architecture = evaluateRules(archSpec, context)

  const projectState = {
    project: {
      name: path.basename(root)
    },

    stack: framework.output,
    architecture: architecture.output,

    features: [],
    current_focus: "unknown",
    progress: {
      percent: 0
    }
  }

  writeJSON(".ai/project-state.json", projectState)

  console.log("✅ Bootstrap completed")
}