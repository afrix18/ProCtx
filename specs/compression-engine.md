# Compression Engine Specification

## Purpose

Reduce context size while preserving project knowledge.

Compression targets:

* long conversations
* large repositories
* repeated discussions

---

# Thresholds

warning:
60000

compress:
100000

critical:
150000

---

# Compression Flow

Conversation
↓
Knowledge Extraction
↓
Memory Update
↓
Generate Handoff
↓
Discard Old Context

---

# Memory Files

Update:

* architecture.md
* business-rules.md
* decisions.md
* progress.md
* next-task.md

Generate:

* handoff.md

---

# Compression Rules

Keep:

* architecture
* business rules
* decisions
* progress
* active tasks

Discard:

* old conversations
* duplicate explanations
* debug logs
* old stack traces
* completed discussions

---

# Compression Goal

Target:

250000 tokens
↓
5000 tokens

Without losing project state.

---

# Output

handoff.md

Containing:

* project overview
* architecture summary
* key decisions
* current progress
* next actions
