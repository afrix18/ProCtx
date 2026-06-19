---

name: project-bootstrap
description: Initialize project memory and detect framework, architecture, and project structure.
-------------------------------------------------------------------------------------------------

# Purpose

Initialize project memory.

# Instructions

1. Scan repository structure.
2. Apply framework-detector rules.
3. Apply architecture-detector rules.
4. Generate memory files if missing.

Create:

.ai/project.yaml
.ai/architecture.md
.ai/business-rules.md
.ai/decisions.md
.ai/progress.md
.ai/next-task.md
.ai/handoff.md
.ai/agent-rules.md

Treat generated files as project source of truth.

Always follow agent-rules.md.
