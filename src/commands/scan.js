import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

import { buildContext } from "../core/context-builder.js"
import { detectFrameworks, detectArchitecture, extractKnowledge } from "../core/detector.js"
import { writeJSON } from "../core/writer.js"
import { scanForSecrets } from "../utils/security.js"
import { createHeader, createSuccessBox, createWarningBox, createStatBox, printInfo, printWarning, printSeparator, printNewLine, PASTEL, CHARMS } from "../utils/ui.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function scan() {
  console.log("")
  console.log(createHeader())
  printSeparator()
  printNewLine()
  
  const root = process.cwd()

  printInfo("Scanning project structure...")
  printNewLine()

  const context = buildContext()
  
  if (context.skippedSensitive && context.skippedSensitive.length > 0) {
    printWarning(`Skipped ${context.skippedSensitive.length} sensitive files`)
  }

  const detectorsDir = path.join(root, ".proctx/detectors")

  if (!fs.existsSync(detectorsDir)) {
    console.log(createWarningBox("Not Initialized", [
      "ProCtx detectors not found",
      "",
      "Run 'proctx init' first"
    ], { width: 50 }))
    printNewLine()
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
    printNewLine()
    printWarning(`Found ${allWarnings.length} security warnings`)
    allWarnings.slice(0, 3).forEach(w => {
      console.log(`     ${w.file}:${w.line} - ${w.message}`)
    })
    if (allWarnings.length > 3) {
      console.log(`     ... and ${allWarnings.length - 3} more`)
    }
    printNewLine()
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
    },
    
    last_scan: new Date().toISOString()
  }

  writeJSON(".ai/project-state.json", projectState)

  const handoff = {
    summary: `${projectState.project.name} - ${projectState.project.description}`,
    scanned_at: projectState.last_scan,
    stack: {
      primary: projectState.framework,
      all: projectState.stack,
      architecture: projectState.architecture
    },
    structure: {
      commands: projectState.commands.length,
      modules: projectState.modules.length,
      routes: projectState.routes.length,
      stores: projectState.stores.length,
      services: projectState.services.length
    },
    current_focus: projectState.current_focus,
    next_actions: [
      "Review project structure",
      "Understand architecture patterns",
      "Check current progress"
    ]
  }

  writeJSON(".ai/handoff.json", handoff)

  const architecture_info = {
    pattern: projectState.architecture,
    layers: projectState.stack,
    conventions: [
      `Framework: ${projectState.framework}`,
      `Architecture: ${projectState.architecture}`,
      `Total modules: ${projectState.modules.length}`,
      `Total commands: ${projectState.commands.length}`
    ]
  }

  writeJSON(".ai/architecture.json", architecture_info)

  printNewLine()
  printInfo("Scan completed successfully")
  printNewLine()

  const stats = [
    { icon: CHARMS.diamond, label: "Framework", value: frameworks.join(", ") || "unknown" },
    { icon: CHARMS.diamond, label: "Architecture", value: architecture },
    { icon: CHARMS.star, label: "Commands", value: knowledge.commands?.length || 0 },
    { icon: CHARMS.star, label: "Modules", value: knowledge.modules.length },
    { icon: CHARMS.star, label: "Routes", value: knowledge.routes.length },
    { icon: CHARMS.star, label: "Stores", value: knowledge.stores.length },
    { icon: CHARMS.star, label: "Services", value: knowledge.services.length },
    { icon: CHARMS.star, label: "Dependencies", value: knowledge.dependencies.length },
  ]

  console.log(createStatBox(stats, { width: 50 }))
  printNewLine()

  console.log(createSuccessBox("Context Updated", [
    "Files updated:",
    "",
    "  .ai/project-state.json",
    "  .ai/handoff.json",
    "  .ai/architecture.json",
    "",
    "Next: proctx prompt"
  ], { width: 50 }))
  printNewLine()
}
