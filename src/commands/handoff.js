import fs from "fs"
import path from "path"

export function handoff() {
  const aiDir = path.join(process.cwd(), ".ai")

  if (!fs.existsSync(aiDir)) {
    console.log("❌ .ai/ folder not found. Run 'proctx init' first.")
    return
  }

  const statePath = path.join(aiDir, "project-state.json")
  const progressPath = path.join(aiDir, "progress.json")
  const decisionsPath = path.join(aiDir, "decisions.json")
  const nextTaskPath = path.join(aiDir, "next-task.json")

  const state = fs.existsSync(statePath)
    ? JSON.parse(fs.readFileSync(statePath, "utf-8"))
    : {}
  const progress = fs.existsSync(progressPath)
    ? JSON.parse(fs.readFileSync(progressPath, "utf-8"))
    : {}
  const decisions = fs.existsSync(decisionsPath)
    ? JSON.parse(fs.readFileSync(decisionsPath, "utf-8"))
    : {}
  const nextTask = fs.existsSync(nextTaskPath)
    ? JSON.parse(fs.readFileSync(nextTaskPath, "utf-8"))
    : {}

  const handoff = {
    timestamp: new Date().toISOString(),
    summary: `Project: ${state.project?.name || "Unknown"}`,
    stack: state.stack || {},
    architecture: state.architecture || {},
    current_focus: state.current_focus || "",
    progress: progress,
    recent_decisions: decisions.decisions?.slice(-5) || [],
    next_actions: nextTask.task ? [nextTask.task] : [],
    context: nextTask.context || ""
  }

  const handoffPath = path.join(aiDir, "handoff.json")
  fs.writeFileSync(handoffPath, JSON.stringify(handoff, null, 2))

  console.log("📋 Handoff documentation generated")
  console.log(`   → ${handoffPath}`)
}
