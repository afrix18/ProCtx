# ProCtx

**AI Project Context Manager**

Scan → Compress → Handoff → Resume

ProCtx Engine is a framework-agnostic context management layer for AI coding agents.

The goal is to preserve project knowledge while minimizing context usage.

Instead of carrying hundreds of thousands of conversation tokens, the system extracts and stores project state into structured memory files.

## Installation

```bash
npm install -g github:avarenza/proctx
```

## Usage

```bash
proctx init       # Initialize .ai/ folder
proctx bootstrap  # Analyze project and create context
proctx detect     # Run framework/architecture detection
proctx compress   # Compress context
proctx handoff    # Generate handoff documentation
proctx resume     # Resume from handoff
```

---

Supported agents:

* OpenCode
* Claude Code
* RooCode
* Kiro

Future:

* VS Code Extension
* CLI Integration
* Auto Compression

---

## Problem

Most coding agents store project state inside conversation history.

Over time:

Conversation History
→ 50k tokens
→ 100k tokens
→ 200k tokens
→ Provider Limits

Result:

* Context overflow
* Higher costs
* Slower responses
* Hallucinations

---

## Solution

ProCtx Engine separates:

Project State
≠
Conversation History

Project knowledge is extracted into memory files:

.ai/
├── project-state.json
├── architecture.json
├── decisions.json
├── progress.json
├── next-task.json
└── handoff.json

---

## Core Components

### Framework Detector

Detect backend, frontend, mobile frameworks.

### Architecture Detector

Detect project architecture patterns.

### Knowledge Extractor

Extract project knowledge.

### Compression Engine

Compress context while preserving knowledge.

### Bootstrap Engine

Restore project state in a new session.

---

## Goals

* Reduce context usage
* Preserve project knowledge
* Improve consistency
* Reduce hallucinations
* Enable long-running projects
