import fs from "fs"
import path from "path"
import { ensureGitignore } from "../utils/gitignore-manager.js"
import { createHeader, createSuccessBox, createWarningBox, printInfo, printSeparator, printNewLine, PASTEL } from "../utils/ui.js"

export function init() {
  console.log("")
  console.log(createHeader())
  printSeparator()
  printNewLine()
  
  const root = process.cwd()
  const aiDir = path.join(root, ".ai")
  const proctxDir = path.join(root, ".proctx/detectors")

  if (fs.existsSync(aiDir)) {
    console.log(createWarningBox("Already Initialized", [
      ".ai/ folder already exists",
      "",
      "Run 'proctx scan' to update context"
    ], { width: 50 }))
    printNewLine()
    return
  }

  printInfo("Initializing project...")
  printNewLine()

  fs.mkdirSync(aiDir, { recursive: true })
  fs.mkdirSync(proctxDir, { recursive: true })

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

  const detectorTemplates = {
    "framework-detector.json": {
      "node": { "indicators": ["package.json"] },
      "vue": { "indicators": ["vite.config.ts", "vite.config.js", "vue.config.js", "package.json:vue"] },
      "react": { "indicators": ["package.json:react", "tsconfig.json", "vite.config.ts"] },
      "laravel": { "indicators": ["composer.json", "artisan", "app/Http"] },
      "pinia": { "indicators": ["src/stores", "src/store", "package.json:pinia"] },
      "vue-router": { "indicators": ["src/router", "package.json:vue-router"] },
      "axios": { "indicators": ["package.json:axios"] },
      "tailwind": { "indicators": ["tailwind.config.js", "tailwind.config.ts", "tailwind.config.cjs", "package.json:tailwindcss"] },
      "vite": { "indicators": ["vite.config.ts", "vite.config.js", "package.json:vite"] },
      "typescript": { "indicators": ["tsconfig.json", "package.json:typescript"] },
      "express": { "indicators": ["package.json:express"] },
      "nestjs": { "indicators": ["nest-cli.json", "package.json:@nestjs/core"] },
      "nextjs": { "indicators": ["next.config.js", "next.config.ts", "package.json:next"] }
    },
    "architecture-detector.json": {
      "cli-tool": {
        "required": ["bin", "src/commands"],
        "optional": ["src/core", "src/utils"],
        "description": "CLI tool architecture with commands pattern"
      },
      "feature-based": {
        "required": ["src/features"],
        "optional": ["src/modules"],
        "description": "Feature-based architecture with isolated feature modules"
      },
      "layered": {
        "required": ["services", "stores"],
        "optional": ["pages", "views", "components"],
        "description": "Traditional layered architecture"
      },
      "solid": {
        "required": ["Services", "Interfaces", "Repositories"],
        "optional": ["Models", "Controllers"],
        "description": "SOLID principles with Laravel-style structure"
      },
      "mvc": {
        "required": ["Controllers", "Models"],
        "optional": ["Views"],
        "description": "Model-View-Controller pattern"
      },
      "clean": {
        "required": ["domain", "application", "infrastructure"],
        "optional": ["presentation"],
        "description": "Clean Architecture with domain-driven design"
      },
      "monorepo": {
        "required": ["packages", "apps"],
        "optional": ["libs"],
        "description": "Monorepo structure with multiple packages"
      }
    },
    "knowledge-extractor.json": {
      "extract": {
        "always": ["package.json", "composer.json", "README.md", "README", ".env.example"],
        "conditional": {
          "if_exists": ["src/router", "src/routes", "routes", "src/stores", "src/store", "src/services", "src/api", "src/features", "src/modules", "src/commands", "app/Http/Controllers", "app/Services", "app/Repositories", "config", "docs"]
        }
      },
      "parsers": {
        "commands": {
          "paths": ["src/commands", "commands"],
          "extract": ["command_names"]
        },
        "router": {
          "paths": ["src/router", "src/routes", "routes"],
          "extract": ["route_names", "path_patterns", "modules"]
        },
        "stores": {
          "paths": ["src/stores", "src/store"],
          "extract": ["store_names", "state_management"]
        },
        "services": {
          "paths": ["src/services", "src/api", "app/Services"],
          "extract": ["service_names", "api_endpoints"]
        },
        "features": {
          "paths": ["src/features", "src/modules"],
          "extract": ["feature_names", "module_structure"]
        },
        "controllers": {
          "paths": ["app/Http/Controllers", "src/controllers"],
          "extract": ["controller_names", "endpoints"]
        }
      },
      "output": {
        "format": "json",
        "structure": {
          "framework": "detected_framework",
          "architecture": "detected_architecture",
          "modules": [],
          "routes": [],
          "stores": [],
          "services": [],
          "layers": []
        }
      }
    }
  }

  for (const [filename, content] of Object.entries(detectorTemplates)) {
    const filePath = path.join(proctxDir, filename)
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
  }

  const skillDir = path.join(root, ".opencode/skills/proctx")
  fs.mkdirSync(skillDir, { recursive: true })
  const skillContent = `---
name: proctx
description: Maintain persistent project knowledge outside conversation history using .ai/ memory files
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: persistent-memory
---

# ProCtx

Purpose:
Maintain persistent project knowledge outside conversation history.

## Startup

When starting a session:

1. Read all files inside \`.ai/\`
2. Use \`.ai\` as the project memory layer
3. Treat memory files as the primary source of truth
4. Compare memory with the current codebase

Files:

* \`.ai/project-state.json\`
* \`.ai/architecture.json\`
* \`.ai/decisions.json\`
* \`.ai/progress.json\`
* \`.ai/next-task.json\`
* \`.ai/handoff.json\`

---

## Development Rules

Before implementing changes:

1. Understand project architecture
2. Review existing technical decisions
3. Review current progress
4. Review next planned task

Prefer:

* Existing architecture
* Existing conventions
* Existing services and modules

Avoid:

* Rewriting architecture
* Duplicating functionality
* Introducing inconsistent patterns

---

## Memory Synchronization

After completing any task:

Update:

* \`progress.json\`
* \`next-task.json\`
* \`handoff.json\`

When architecture changes:

Update:

* \`architecture.json\`

When technical decisions are made:

Update:

* \`decisions.json\`

When project metadata changes:

Update:

* \`project-state.json\`

---

## Context Compression

If conversation context becomes large:

1. Extract important knowledge
2. Remove redundant information
3. Generate concise handoff summary
4. Preserve future task continuity

Store results in:

* \`handoff.json\`

---

## Resume Workflow

When resuming work:

1. Read all \`.ai\` files
2. Read \`handoff.json\`
3. Restore project understanding
4. Continue current task

Do not re-analyze the entire codebase unless necessary.

---

## Philosophy

Project State \u2260 Conversation History

Conversation history is temporary.

Project knowledge must persist.
`
  fs.writeFileSync(path.join(skillDir, "SKILL.md"), skillContent)

  const gitignoreResult = ensureGitignore(root)
  
  printNewLine()
  console.log(createSuccessBox("Initialization Complete", [
    "Created .ai/ folder with templates",
    "Created .proctx/detectors/ with configs",
    "Created .opencode/skills/proctx/ for opencode",
    "Updated .gitignore",
    "",
    "Next steps:",
    "",
    "  1. proctx scan    Analyze your project",
    "  2. proctx prompt  Get AI prompt"
  ], { width: 50 }))
  printNewLine()
}
