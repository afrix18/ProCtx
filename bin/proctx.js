#!/usr/bin/env node

import { init } from "../src/commands/init.js"
import { bootstrap } from "../src/commands/bootstrap.js"
import { detect } from "../src/commands/detect.js"
import { compress } from "../src/commands/compress.js"
import { handoff } from "../src/commands/handoff.js"
import { resume } from "../src/commands/resume.js"

const command = process.argv[2]

switch (command) {
  case "init":
    init()
    break

  case "bootstrap":
    bootstrap()
    break

  case "detect":
    detect()
    break

  case "compress":
    compress()
    break

  case "handoff":
    handoff()
    break

  case "resume":
    resume()
    break

  default:
    console.log(`
ProCtx - Project Context Management CLI

Commands:
  proctx init       - Initialize .ai/ folder with templates
  proctx bootstrap  - Analyze project and create context
  proctx detect     - Run framework/architecture detection
  proctx compress   - Compress context into handoff format
  proctx handoff    - Generate handoff documentation
  proctx resume     - Resume from handoff context
`)
}