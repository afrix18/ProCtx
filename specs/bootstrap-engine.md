# Bootstrap Engine Specification

## Purpose

Restore project state from memory files when starting a new session.

---

# Read Order

1. project.yaml
2. architecture.md
3. business-rules.md
4. decisions.md
5. progress.md
6. next-task.md
7. handoff.md

---

# Build Project State

Construct:

* framework understanding
* architecture understanding
* business understanding
* implementation progress
* active tasks

---

# Validation

Check:

* missing files
* outdated files
* conflicting decisions

Generate warnings when inconsistencies are found.

---

# Bootstrap Output

Current Framework

Current Architecture

Current Business Rules

Current Progress

Current Tasks

Known Issues

---

# Agent Behavior

After bootstrap:

* follow architecture.md
* follow business-rules.md
* follow decisions.md

Never override project decisions without explicit user approval.

Always continue from next-task.md when available.

---

# Success Criteria

A new session should understand the project within less than 5000 tokens.

No dependency on previous conversations.
