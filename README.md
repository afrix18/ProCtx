🌍 Languages

- English (default)
- [Bahasa Indonesia](README.id.md)

# ProCtx

> AI Project Context Manager

Scan → Compress → Handoff → Resume

ProCtx is a framework-agnostic context management system for AI coding agents.

The goal is to preserve project knowledge while reducing context usage and preventing context overflow.

---

## Why ProCtx?

Most AI coding agents rely entirely on conversation history.

As projects grow:

50k tokens
→ 100k tokens
→ 200k tokens
→ Context Overflow

This causes:

- Lost project knowledge
- Repeated explanations
- Higher costs
- Slower responses
- Hallucinations

ProCtx separates:

Project State
≠
Conversation History

---

## Installation

### GitHub

```bash
npm install -g github:avarenza/proctx
```

Verify:

```bash
proctx --help
```

---

## Quick Start

### Initialize

```bash
proctx init
```

Creates:

```txt
.ai/
├── project-state.json
├── architecture.json
├── decisions.json
├── progress.json
├── next-task.json
└── handoff.json
```

### Analyze Project

```bash
proctx bootstrap
```

### Detect Architecture

```bash
proctx detect
```

### Compress Context

```bash
proctx compress
```

### Generate Handoff

```bash
proctx handoff
```

### Resume Session

```bash
proctx resume
```

### Generate AI Prompt

```bash
proctx prompt
```

Generates a ready-to-use prompt for AI coding assistants (OpenCode, Claude Code, Cursor, etc.).

The prompt automatically detects your framework and includes:
- Universal context management rules
- Framework-specific conventions (Laravel, Vue, Next.js, Flutter, SOLID)
- Architecture patterns from your project

Simply copy the output and paste it into your AI assistant.

---

## OpenCode Example

Prompt:

Read all files inside .ai/

Use them as source of truth.

Follow architecture decisions and current project state.

---

## Supported Agents

- OpenCode
- Claude Code
- RooCode
- Kiro

Planned:

- VS Code Extension
- Cursor
- Windsurf

---

## Philosophy

Project State
≠
Conversation History

Conversation history is temporary.

Project knowledge should persist.

---

## License

MIT