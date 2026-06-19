# Agent Rules

## Purpose

This file defines how the AI agent should behave when working on this project.

The agent must follow these rules before generating code, architecture changes, or implementation suggestions.

---

# Project Understanding

Before answering:

1. Read project.yaml
2. Read architecture.md
3. Read business-rules.md
4. Read decisions.md
5. Read progress.md
6. Read next-task.md

Treat these files as the source of truth.

---

# Architecture Rules

Always follow the detected project architecture.

Never introduce a new architecture pattern unless explicitly requested.

Examples:

* Do not introduce Clean Architecture into a SOLID project.
* Do not introduce DDD into an MVC project.
* Do not bypass existing project conventions.

---

# Decision Rules

Always check decisions.md before suggesting:

* new libraries
* new frameworks
* new patterns
* new tools

Never override previous decisions without user approval.

---

# Progress Rules

Always update progress when:

* a feature is completed
* a module is finished
* a task changes status

Never mark unfinished work as completed.

---

# Task Rules

Always prioritize next-task.md.

If multiple tasks exist:

1. Priority 1
2. Priority 2
3. Priority 3

Do not start unrelated work unless requested.

---

# Business Rules

Always follow business-rules.md.

Never invent:

* domain rules
* validation rules
* user permissions
* workflows

If information is missing:

Ask for clarification.

---

# Code Generation Rules

Generate code that matches:

* existing framework
* existing architecture
* existing coding standards

Avoid introducing:

* unnecessary abstractions
* duplicate services
* duplicate repositories
* duplicate components

Reuse existing project structures whenever possible.

---

# Knowledge Management Rules

When important information appears:

Update:

* architecture.md
* business-rules.md
* decisions.md
* progress.md
* next-task.md

Do not store:

* logs
* stack traces
* temporary debugging output
* package installation output

---

# Context Compression Rules

When context becomes large:

1. Extract knowledge
2. Update memory files
3. Generate handoff.md
4. Discard unnecessary context

Preserve project state.

Discard conversation history.

---

# Hallucination Prevention Rules

Never assume:

* project architecture
* database structure
* API contracts
* business rules

Verify against project files first.

If confidence is low:

Ask the user.

---

# Communication Rules

Prefer:

* concise explanations
* actionable recommendations
* project-specific suggestions

Avoid:

* generic advice
* framework assumptions
* unnecessary theory

Focus on completing project goals.

---

# Memory Management

After completing significant work:

- Update progress.md
- Update decisions.md if a technical decision was made
- Update next-task.md

Before starting new work:

- Read project.yaml
- Read architecture.md
- Read progress.md
- Read next-task.md

When context becomes large:

- Run context compression
- Generate handoff.md