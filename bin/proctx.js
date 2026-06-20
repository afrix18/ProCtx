#!/usr/bin/env node

import { init } from "../src/commands/init.js"
import { scan } from "../src/commands/scan.js"
import { prompt } from "../src/commands/prompt.js"
import { createHeader, createBox, printInfo, printSeparator, printNewLine, PASTEL } from "../src/utils/ui.js"

const command = process.argv[2]

switch (command) {
  case "init":
    init()
    break

  case "scan":
    scan()
    break

  case "prompt":
    prompt()
    break

  default:
    console.log("")
    console.log(createHeader())
    printSeparator()
    printNewLine()
    
    console.log(createBox([
      "proctx init       Initialize project",
      "proctx scan       Scan and analyze",
      "proctx prompt     Generate AI prompt"
    ], { title: "Commands", width: 50, color: PASTEL.lavender }))
    printNewLine()
    
    console.log(createBox([
      "proctx init      First time setup",
      "proctx scan      Analyze project",
      "proctx prompt    Get prompt for AI"
    ], { title: "Examples", width: 50, color: PASTEL.mint }))
    printNewLine()
    
    printInfo("More info: https://github.com/afrix18/proctx")
    printNewLine()
}
