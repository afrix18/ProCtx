import fs from "fs"
import path from "path"
import { writeJSON } from "../core/writer.js"

export function compress() {
  const statePath = path.join(process.cwd(), ".ai/project-state.json")

  if (!fs.existsSync(statePath)) {
    console.log("❌ No project-state.json found. Run bootstrap first.")
    return
  }

  const state = JSON.parse(fs.readFileSync(statePath, "utf-8"))

  const handoff = {
    summary: `Project ${state.project.name}`,
    stack: state.stack,
    architecture: state.architecture,
    current_focus: state.current_focus,
    next_actions: []
  }

  writeJSON(".ai/handoff.json", handoff)

  console.log("🧠 Context compressed into handoff.json")
}