import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { buildContext } from "../core/context-builder.js"
import { evaluateRules } from "../core/rule-engine.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function detect() {
  const context = buildContext()

  const specsDir = path.join(__dirname, "../specs")

  const spec = JSON.parse(
    fs.readFileSync(
      path.join(specsDir, "framework-detector.json"),
      "utf-8"
    )
  )

  const result = evaluateRules(spec, context)

  console.log("🔍 Detection Result:")
  console.log(result)
}