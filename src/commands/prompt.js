import fs from "fs"
import path from "path"

export function prompt() {
  const root = process.cwd()
  const aiDir = path.join(root, ".ai")

  if (!fs.existsSync(aiDir)) {
    console.log("⚠️  .ai/ folder not found. Run 'proctx init' first.")
    return
  }

  let projectState = {}
  const projectStatePath = path.join(aiDir, "project-state.json")
  
  if (fs.existsSync(projectStatePath)) {
    projectState = JSON.parse(fs.readFileSync(projectStatePath, "utf-8"))
  }

  const detectedFramework = detectFrameworkType(projectState)
  const promptText = generatePrompt(detectedFramework, projectState)

  console.log(promptText)
}

function detectFrameworkType(projectState) {
  const stack = projectState.stack || {}
  const architecture = projectState.architecture || {}

  if (stack.backend === "laravel" || stack.backend === "php") {
    return "laravel"
  }

  if (stack.frontend === "vue" || stack.frontend === "nuxt") {
    return "vue"
  }

  if (stack.frontend === "next.js" || stack.frontend === "react") {
    return "nextjs"
  }

  if (stack.frontend === "flutter" || stack.backend === "flutter") {
    return "flutter"
  }

  if (architecture.pattern === "solid" || architecture.pattern === "repository") {
    return "solid"
  }

  return "general"
}

function generatePrompt(framework, projectState) {
  const commonPrompt = `Read all files inside .ai/

Use them as source of truth.

Follow:
- Existing architecture
- Existing decisions
- Existing business rules
- Current progress
- Next tasks

Before coding:
- Understand existing patterns
- Reuse existing code when possible
- Ask when information is missing

Avoid:
- Rewriting architecture
- Duplicating features
- Ignoring project conventions

After each task:
- Summarize changes
- Update progress in .ai/
- Generate handoff notes`

  const frameworkSpecific = {
    laravel: `

This is a Laravel project following SOLID principles.

Architecture flow:
Controller → Service → Interface → Repository → Model

Rules:
- No business logic in controllers
- No direct DB access from controllers
- Use existing services whenever possible
- Follow dependency injection pattern`,

    vue: `

This is a Vue.js project.

Rules:
- Follow composition API if used in existing code
- Reuse existing composables
- Follow component naming conventions
- Keep components small and focused`,

    nextjs: `

This is a Next.js project.

Rules:
- Follow App Router or Pages Router (check existing structure)
- Use server components when possible
- Follow data fetching patterns
- Reuse existing utilities and hooks`,

    flutter: `

This is a Flutter project.

Rules:
- Follow existing state management pattern
- Reuse existing widgets
- Follow Material Design or existing theme
- Keep widget tree shallow`,

    solid: `

This project follows SOLID principles.

Rules:
- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

Follow repository pattern if detected.`,

    general: ""
  }

  return commonPrompt + (frameworkSpecific[framework] || "")
}
