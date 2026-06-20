# ProCtx - AI Project Context Manager

[![npm version](https://img.shields.io/npm/v/proctx)](https://www.npmjs.com/package/proctx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🇮🇩 Indonesian](./README.id.md)

**Manage AI project context across any AI coding agent.**

ProCtx automatically scans your project, detects frameworks and architecture patterns, and generates structured context files that help AI assistants understand your codebase.

## Why ProCtx?

AI coding assistants (Claude, GPT, Cursor, etc.) often lose context when:
- Projects grow large
- Multiple sessions are needed
- Context windows overflow

**ProCtx solves this by:**
- ✅ Scanning project structure automatically
- ✅ Detecting frameworks (Vue, React, Laravel, Node, etc.)
- ✅ Identifying architecture patterns (MVC, SOLID, CLI-tool, etc.)
- ✅ Generating structured context files
- ✅ Working with **any AI agent** (agent-agnostic)

## Installation

```bash
npm install -g proctx
```

Or use without installation:

```bash
npx proctx --help
```

## Quick Start

**3 simple commands to get started:**

```bash
# 1. Initialize your project
proctx init

# 2. Scan and analyze
proctx scan

# 3. Get AI prompt
proctx prompt
```

### What Each Command Does

#### `proctx init`
- Creates `.ai/` folder with context files
- Creates `.proctx/detectors/` with detector configs
- Creates `.opencode/skills/proctx/` with opencode skill
- Sets up `.gitignore` (excludes `.ai/`, `.proctx/`, ignores `.opencode/` but tracks skills)

**Output:**
```
.ai/
├── project-state.json    # Main context file
├── architecture.json     # Architecture patterns
├── decisions.json        # Project decisions
├── progress.json         # Work progress
├── next-task.json        # Next task info
└── handoff.json          # Handoff summary

.proctx/
└── detectors/
    ├── framework-detector.json
    ├── architecture-detector.json
    └── knowledge-extractor.json

.opencode/
└── skills/
    └── proctx/
        └── SKILL.md       # OpenCode skill definition
```

#### `proctx scan`
- Detects frameworks (Node, Vue, React, Laravel, etc.)
- Identifies architecture patterns
- Extracts modules, routes, stores, services, commands
- Scans for security issues (hardcoded secrets)
- Updates `.ai/project-state.json` and related files

**Example output:**
```
🔍 Scanning project...
🔒 Skipped 3 sensitive files
✅ Scan completed
📦 Framework: node
🏗️  Architecture: cli-tool
⚡ Commands: 3
📂 Modules: 0
📦 Dependencies: 12

💾 Updated: .ai/project-state.json, handoff.json, architecture.json
```

#### `proctx prompt`
- Generates AI-ready prompt based on your project
- Works with **any AI agent** (Claude, GPT, Cursor, Windsurf, etc.)
- Includes framework-specific instructions
- Respects existing architecture and conventions

**Usage:**
1. Run `proctx prompt`
2. Copy the output
3. Paste into your AI assistant
4. The AI now understands your project context!

## How It Works

```
Your Project
    ↓
proctx scan
    ↓
Detects: Framework, Architecture, Modules, Security
    ↓
Generates: .ai/*.json (structured context)
    ↓
proctx prompt
    ↓
AI Agent reads .ai/ files
    ↓
AI understands your project!
```

## Supported Frameworks

ProCtx automatically detects:

**Frontend:**
- Vue.js (2, 3)
- React
- Next.js
- Nuxt
- Svelte

**Backend:**
- Node.js
- Laravel
- Express
- NestJS

**Mobile:**
- Flutter

**Architecture Patterns:**
- MVC
- SOLID
- CLI-tool
- Monorepo
- Microservices
- Clean Architecture

## Security Features

ProCtx includes built-in security scanning:

### 🔒 Sensitive File Protection
Automatically skips:
- `.env` files
- `credentials.json`
- Private keys (`.pem`, `.key`)
- AWS credentials
- Firebase service accounts

### 🛡️ Secret Detection
Scans for:
- API keys (OpenAI, GitHub, AWS, etc.)
- Passwords and tokens
- Hardcoded secrets
- JWT tokens
- Private keys

**Example warning:**
```
🔒 Skipped 2 sensitive files
⚠️  Security Warnings (1):
   src/config.js:15 - Hardcoded secret in key: API_KEY
```

## Project Structure

```
.ai/                        # AI context files (gitignored)
├── project-state.json      # Main project context
├── architecture.json       # Architecture patterns
├── decisions.json          # Project decisions
├── progress.json           # Work progress
├── next-task.json          # Next task
└── handoff.json            # Handoff summary

.proctx/                    # ProCtx configs (gitignored)
└── detectors/
    ├── framework-detector.json
    ├── architecture-detector.json
    └── knowledge-extractor.json

.opencode/                  # OpenCode integration (skills tracked)
└── skills/
    └── proctx/
        └── SKILL.md        # Native OpenCode skill
```

## Example: project-state.json

```json
{
  "project": {
    "name": "ProCtx",
    "description": "AI Project Context Manager"
  },
  "framework": "node",
  "stack": ["node"],
  "architecture": "cli-tool",
  "commands": ["init", "scan", "prompt"],
  "modules": [],
  "routes": [],
  "stores": [],
  "services": [],
  "dependencies": 12,
  "features": [],
  "last_scan": "2026-06-20T04:15:00.000Z"
}
```

## Workflow

### First Time Setup
```bash
cd your-project
proctx init
proctx scan
```

### Before AI Session
```bash
proctx scan          # Update context
proctx prompt        # Get prompt for AI
# Paste prompt into AI assistant
```

### After AI Session
```bash
# AI updates .ai/progress.json
# AI updates .ai/decisions.json
# AI updates .ai/next-task.json
```

### Handoff to Another Agent
```bash
proctx scan          # Refresh context
proctx prompt        # Generate new prompt
# New agent reads .ai/handoff.json
```

## Configuration

Detector configs are stored in `.proctx/detectors/`:

- **framework-detector.json** - Framework detection rules
- **architecture-detector.json** - Architecture pattern rules
- **knowledge-extractor.json** - What to extract (modules, routes, etc.)

You can customize these to match your project needs.

## Supported Agents

ProCtx works with:

- ✅ **OpenCode** — native skill integration (`.opencode/skills/proctx/`)
- ✅ Claude (Anthropic)
- ✅ ChatGPT (OpenAI)
- ✅ Cursor
- ✅ Windsurf
- ✅ GitHub Copilot
- ✅ Codeium
- ✅ Any agent that can read project files

**Why agent-agnostic?**
- ProCtx generates standard JSON files
- No proprietary formats
- No vendor lock-in
- Works offline
- Version control friendly

## CLI Reference

```bash
proctx init       # Initialize project
proctx scan       # Scan and analyze
proctx prompt     # Generate AI prompt
proctx --help     # Show help
```

## FAQ

**Q: Do I need to commit .ai/ files to git?**  
A: No, they're automatically gitignored. Each developer runs `proctx scan` locally.

**Q: Can I use ProCtx with multiple AI agents?**  
A: Yes! The same `.ai/` files work with any agent. ProCtx also includes a native skill for **OpenCode**.

**Q: Does ProCtx send data to external servers?**  
A: No, everything runs locally. Your code never leaves your machine.

**Q: Can I customize detection rules?**  
A: Yes, edit files in `.proctx/detectors/` to match your needs.

**Q: What if my framework isn't detected?**  
A: Add it to `.proctx/detectors/framework-detector.json` and submit a PR!

## Contributing

Contributions welcome! 

1. Fork the repo
2. Create feature branch
3. Test with `npm test`
4. Submit PR

## License

MIT © afrix18

## Links

- **GitHub:** https://github.com/afrix18/proctx
- **npm:** https://www.npmjs.com/package/proctx
- **Issues:** https://github.com/afrix18/proctx/issues

---

**Made with ❤️ for the AI coding community**
