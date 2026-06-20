import fs from "fs"
import path from "path"
import { buildContext } from "../core/context-builder.js"
import { evaluateRules } from "../core/rule-engine.js"

export function detect() {
  const root = process.cwd()
  const context = buildContext()

  const spec = JSON.parse(
    fs.readFileSync(
      path.join(root, "src/specs/framework-detector.json"),
      "utf-8"
    )
  )

  const result = evaluateRules(spec, context)

  console.log("🔍 Detection Result:")
  console.log(result)
}