import fs from "fs"
import path from "path"

export function init() {
  const aiDir = path.join(process.cwd(), ".ai")

  if (fs.existsSync(aiDir)) {
    console.log("⚠️  .ai/ folder already exists")
    return
  }

  fs.mkdirSync(aiDir, { recursive: true })

  const templates = {
    "project-state.json": {
      project: { name: "", version: "0.1.0" },
      stack: { backend: "unknown", frontend: "unknown" },
      architecture: { pattern: "unknown" },
      features: [],
      current_focus: "",
      progress: { percent: 0 }
    },
    "architecture.json": {
      pattern: "",
      layers: [],
      conventions: []
    },
    "decisions.json": {
      decisions: []
    },
    "progress.json": {
      completed: [],
      in_progress: [],
      blocked: []
    },
    "next-task.json": {
      task: "",
      context: "",
      dependencies: []
    },
    "handoff.json": {
      summary: "",
      stack: {},
      architecture: {},
      current_focus: "",
      next_actions: []
    }
  }

  for (const [filename, content] of Object.entries(templates)) {
    const filePath = path.join(aiDir, filename)
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
  }

  console.log("✅ Initialized .ai/ folder with templates")
}
