import fs from "fs"
import path from "path"

import { buildContext } from "../core/context-builder.js"
import { evaluateRules } from "../core/rule-engine.js"
import { writeJSON } from "../core/writer.js"

export function bootstrap() {
  const root = process.cwd()

  const context = buildContext()

  // load specs
  const frameworkSpec = JSON.parse(
    fs.readFileSync(
      path.join(root, "src/specs/framework-detector.json"),
      "utf-8"
    )
  )

  const archSpec = JSON.parse(
    fs.readFileSync(
      path.join(root, "src/specs/architecture-detector.json"),
      "utf-8"
    )
  )

  const framework = evaluateRules(frameworkSpec, context)
  const architecture = evaluateRules(archSpec, context)

  // build project state
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

  // write outputs
  writeJSON(".ai/project-state.json", projectState)

  console.log("✅ PMS Bootstrap completed")
}