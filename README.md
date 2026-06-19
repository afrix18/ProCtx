# Project Memory System

Project Memory System is a framework-agnostic memory layer for AI coding agents.

The goal is to preserve project knowledge while minimizing context usage.

Instead of carrying hundreds of thousands of conversation tokens, the system extracts and stores project state into structured memory files.

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

Project Memory System separates:

Project State
≠
Conversation History

Project knowledge is extracted into memory files:

.ai/
├── project.yaml
├── architecture.md
├── business-rules.md
├── decisions.md
├── progress.md
├── next-task.md
└── handoff.md

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
