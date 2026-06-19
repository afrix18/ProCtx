# Knowledge Extractor Specification

## Purpose

Extract project knowledge from conversations, repository analysis, tasks, and implementation history.

The goal is to preserve knowledge, not preserve chat history.

---

# Knowledge Categories

## Architecture

Extract:

* framework
* architecture pattern
* folder structure
* dependency rules

Update:

architecture.md

---

## Business Rules

Extract:

* domain rules
* validation rules
* workflow rules
* user permissions

Update:

business-rules.md

---

## Technical Decisions

Extract:

* selected libraries
* selected frameworks
* selected patterns
* accepted/rejected approaches

Update:

decisions.md

---

## Progress

Extract:

* completed work
* current work
* unfinished work

Update:

progress.md

---

## Tasks

Extract:

* immediate tasks
* blockers
* priorities

Update:

next-task.md

---

# Ignore Rules

Never store:

* logs
* stack traces
* old code snippets
* temporary debugging output
* package installation output
* conversation filler

---

# Output

Update:

* architecture.md
* business-rules.md
* decisions.md
* progress.md
* next-task.md
