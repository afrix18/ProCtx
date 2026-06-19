---

name: context-compression
description: Compress project context into memory files and generate handoff state.
-----------------------------------------------------------------------------------

# Purpose

Reduce context size while preserving project knowledge.

# Instructions

1. Extract project knowledge.
2. Update memory files.
3. Generate .ai/handoff.md.

Keep:

* architecture
* business rules
* decisions
* progress
* active tasks

Discard:

* old conversations
* duplicate discussions
* temporary outputs
* debugging logs

Target:

Preserve project state using minimal context.

Output:

.ai/handoff.md
