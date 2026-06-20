import fs from "fs"
import path from "path"

export function resume() {
  const handoffPath = path.join(process.cwd(), ".ai/handoff.json")

  if (!fs.existsSync(handoffPath)) {
    console.log("❌ No handoff.json found. Run 'proctx handoff' first.")
    return
  }

  const handoff = JSON.parse(fs.readFileSync(handoffPath, "utf-8"))

  console.log("🔄 Resuming from handoff...\n")
  console.log(`📦 Project: ${handoff.summary}`)
  console.log(`🏗️  Stack: ${JSON.stringify(handoff.stack, null, 2)}`)
  console.log(`🧩 Architecture: ${handoff.architecture.pattern || "unknown"}`)
  console.log(`🎯 Current Focus: ${handoff.current_focus || "none"}`)
  
  if (handoff.next_actions?.length > 0) {
    console.log(`\n📝 Next Actions:`)
    handoff.next_actions.forEach((action, i) => {
      console.log(`   ${i + 1}. ${action}`)
    })
  }

  if (handoff.context) {
    console.log(`\n💡 Context: ${handoff.context}`)
  }

  console.log(`\n✅ Context restored from ${handoff.timestamp}`)
}
