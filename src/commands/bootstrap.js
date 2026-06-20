import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

import { buildContext } from "../core/context-builder.js"
import { detectFrameworks, detectArchitecture, extractKnowledge } from "../core/detector.js"
import { writeJSON } from "../core/writer.js"
import { scanForSecrets } from "../utils/security.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function bootstrap() {
  const root = process.cwd()

  const context = buildContext()
  
  if (context.skippedSensitive && context.skippedSensitive.length > 0) {
    console.log(`🔒 Skipped ${context.skippedSensitive.length} sensitive files`)
  }

  const detectorsDir = path.join(root, ".opencode/detectors")

  if (!fs.existsSync(detectorsDir)) {
    console.log("❌ Detectors not found. Run init first.")
    return
  }

  const frameworkConfig = JSON.parse(
    fs.readFileSync(
      path.join(detectorsDir, "framework-detector.json"),
      "utf-8"
    )
  )

  const archConfig = JSON.parse(
    fs.readFileSync(
      path.join(detectorsDir, "architecture-detector.json"),
      "utf-8"
    )
  )

  const extractorConfig = JSON.parse(
    fs.readFileSync(
      path.join(detectorsDir, "knowledge-extractor.json"),
      "utf-8"
    )
  )

  const frameworks = detectFrameworks(frameworkConfig, context)
  const architecture = detectArchitecture(archConfig, context)
  const knowledge = extractKnowledge(extractorConfig, context)

  const allWarnings = []
  
  if (knowledge.readme?.commands) {
    for (const cmd of knowledge.commands || []) {
      const cmdFilePath = path.join(root, "src", "commands", `${cmd.replace(/^proctx\s+/, "")}.js`)
      if (fs.existsSync(cmdFilePath)) {
        const content = fs.readFileSync(cmdFilePath, "utf-8")
        const warnings = scanForSecrets(content, cmdFilePath)
        if (warnings.length > 0) {
          allWarnings.push(...warnings)
        }
      }
    }
  }

  if (allWarnings.length > 0) {
    console.log(`\n⚠️  Security Warnings (${allWarnings.length}):`)
    allWarnings.forEach(w => {
      console.log(`   ${w.file}:${w.line} - ${w.message}`)
    })
    console.log("")
  }

  const projectState = {
    project: {
      name: knowledge.readme?.title || path.basename(root),
      description: knowledge.readme?.description || ""
    },

    framework: frameworks.length > 0 ? frameworks[0] : "unknown",
    stack: frameworks,
    architecture: architecture,

    commands: knowledge.commands || [],
    modules: knowledge.modules,
    routes: knowledge.routes,
    stores: knowledge.stores,
    services: knowledge.services,

    dependencies: knowledge.dependencies,
    scripts: knowledge.scripts,
    envVars: knowledge.envVars,

    features: knowledge.readme?.features || [],
    cli_commands: knowledge.readme?.commands || [],
    supported_agents: knowledge.readme?.supportedAgents || [],
    current_focus: "unknown",
    progress: {
      percent: 0
    }
  }

  writeJSON(".ai/project-state.json", projectState)

  console.log("✅ Bootstrap completed")
  console.log(`📦 Framework: ${frameworks.join(", ") || "unknown"}`)
  console.log(`🏗️  Architecture: ${architecture}`)
  console.log(`⚡ Commands: ${knowledge.commands?.length || 0}`)
  console.log(`📂 Modules: ${knowledge.modules.length}`)
  console.log(`🛣️  Routes: ${knowledge.routes.length}`)
  console.log(`🗄️  Stores: ${knowledge.stores.length}`)
  console.log(`⚙️  Services: ${knowledge.services.length}`)
  console.log(`📦 Dependencies: ${knowledge.dependencies.length}`)
  console.log(`🎯 Features: ${knowledge.readme?.features?.length || 0}`)
}