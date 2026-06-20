const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  
  brightBlack: "\x1b[90m",
  brightRed: "\x1b[91m",
  brightGreen: "\x1b[92m",
  brightYellow: "\x1b[93m",
  brightBlue: "\x1b[94m",
  brightMagenta: "\x1b[95m",
  brightCyan: "\x1b[96m",
  brightWhite: "\x1b[97m",
}

const PASTEL = {
  pink: { fg: "\x1b[38;5;205m", bg: "\x1b[48;5;225m" },
  peach: { fg: "\x1b[38;5;215m", bg: "\x1b[48;5;230m" },
  mint: { fg: "\x1b[38;5;114m", bg: "\x1b[48;5;194m" },
  lavender: { fg: "\x1b[38;5;141m", bg: "\x1b[48;5;189m" },
  sky: { fg: "\x1b[38;5;111m", bg: "\x1b[48;5;195m" },
  lilac: { fg: "\x1b[38;5;141m", bg: "\x1b[48;5;219m" },
  coral: { fg: "\x1b[38;5;209m", bg: "\x1b[48;5;224m" },
  sage: { fg: "\x1b[38;5;108m", bg: "\x1b[48;5;194m" },
  sand: { fg: "\x1b[38;5;180m", bg: "\x1b[48;5;230m" },
  rose: { fg: "\x1b[38;5;168m", bg: "\x1b[48;5;218m" },
  periwinkle: { fg: "\x1b[38;5;105m", bg: "\x1b[48;5;189m" },
}

const CHARMS = {
  top: { left: "╭", right: "╮", line: "─" },
  mid: { left: "├", right: "┤", line: "─" },
  bot: { left: "╰", right: "╯", line: "─" },
  line: "│",
  dot: "•",
  diamond: "◆",
  star: "✦",
  arrow: "→",
  check: "✓",
  cross: "✗",
  warn: "⚠",
  info: "ℹ",
  sparkle: "✧",
  bullet: "◦",
  circle: "○",
  filledCircle: "●",
  heart: "♡",
  starFilled: "★",
  triangle: "▸",
  square: "■",
  music: "♪",
  cloud: "☁",
  sun: "☀",
  moon: "☽",
  flower: "✿",
  leaf: "♻",
  infinity: "∞",
}

function createPadding(len, char = " ") {
  return char.repeat(len)
}

function createLine(width, char = "─") {
  return char.repeat(width)
}

function createBox(lines, opts = {}) {
  const {
    title = "",
    width = 50,
    padding = 2,
    color = PASTEL.lavender,
    showHeader = true,
    showFooter = true,
    borderStyle = "rounded"
  } = opts

  const borders = borderStyle === "rounded" ? CHARMS.top : { left: "┌", right: "┐", line: "─" }
  const botBorders = borderStyle === "rounded" ? CHARMS.bot : { left: "└", right: "┘", line: "─" }
  
  const innerWidth = width - 2 - (padding * 2)
  const result = []

  if (showHeader) {
    if (title) {
      const titleText = ` ${title} `
      const titleLen = titleText.length
      const leftLen = Math.floor((innerWidth - titleLen) / 2)
      const rightLen = innerWidth - titleLen - leftLen
      
      if (leftLen > 0 && rightLen > 0) {
        const line = `${color.fg}${borders.left}${createLine(leftLen, borders.line)}${C.bold}${titleText}${C.reset}${color.fg}${createLine(rightLen, borders.line)}${borders.right}${C.reset}`
        result.push(line)
      } else {
        result.push(`${color.fg}${borders.left}${createLine(innerWidth, borders.line)}${borders.right}${C.reset}`)
      }
    } else {
      result.push(`${color.fg}${borders.left}${createLine(innerWidth, borders.line)}${borders.right}${C.reset}`)
    }
  }

  result.push(`${color.fg}${CHARMS.line}${C.reset}${createPadding(padding + innerWidth + padding)}${color.fg}${CHARMS.line}${C.reset}`)

  for (const line of lines) {
    const stripped = line.replace(/\x1b\[[0-9;]*m/g, "")
    const visibleLen = stripped.length
    const padRight = Math.max(0, innerWidth - visibleLen)
    const content = `${createPadding(padding)}${line}${createPadding(padRight > 0 ? padRight : 0)}${createPadding(padding)}`
    result.push(`${color.fg}${CHARMS.line}${C.reset}${content}${color.fg}${CHARMS.line}${C.reset}`)
  }

  result.push(`${color.fg}${CHARMS.line}${C.reset}${createPadding(padding + innerWidth + padding)}${color.fg}${CHARMS.line}${C.reset}`)

  if (showFooter) {
    result.push(`${color.fg}${botBorders.left}${createLine(innerWidth, botBorders.line)}${botBorders.right}${C.reset}`)
  }

  return result.join("\n")
}

function createStatBox(stats, opts = {}) {
  const { width = 50, color = PASTEL.mint } = opts
  
  const lines = []
  const maxKeyLen = Math.max(...stats.map(s => s.label.length))
  
  for (const stat of stats) {
    const icon = stat.icon || CHARMS.dot
    const key = stat.label.padEnd(maxKeyLen)
    const value = stat.value.toString()
    lines.push(`${C.brightWhite}${icon}  ${key}${C.reset}  ${color.fg}${C.bold}${value}${C.reset}`)
  }
  
  return createBox(lines, { title: "Analysis", width, color, ...opts })
}

function createPromptBox(lines, opts = {}) {
  const { width = 60, color = PASTEL.sky } = opts
  
  const wrappedLines = []
  for (const line of lines) {
    if (line.length > width - 10) {
      const words = line.split(" ")
      let currentLine = ""
      for (const word of words) {
        if ((currentLine + " " + word).length > width - 10) {
          wrappedLines.push(currentLine)
          currentLine = word
        } else {
          currentLine = currentLine ? currentLine + " " + word : word
        }
      }
      if (currentLine) wrappedLines.push(currentLine)
    } else {
      wrappedLines.push(line)
    }
  }
  
  return createBox(wrappedLines, { width, color, ...opts })
}

function createHeader() {
  const lines = [
    ``,
    `  ${C.bold}${PASTEL.lavender.fg}${C.bold}ProCtx${C.reset}`,
    `  ${C.dim}AI Project Context Manager${C.reset}`,
    ``,
  ]
  return lines.join("\n")
}

function createSuccessBox(title, message, opts = {}) {
  const { width = 50 } = opts
  const lines = []
  
  if (typeof message === "string") {
    const msgLines = message.split("\n")
    for (const line of msgLines) {
      lines.push(`${PASTEL.mint.fg}${line}${C.reset}`)
    }
  } else if (Array.isArray(message)) {
    for (const line of message) {
      lines.push(`${PASTEL.mint.fg}${line}${C.reset}`)
    }
  }
  
  return createBox(lines, { title, width, color: PASTEL.mint, ...opts })
}

function createWarningBox(title, message, opts = {}) {
  const { width = 50 } = opts
  const lines = []
  
  if (typeof message === "string") {
    const msgLines = message.split("\n")
    for (const line of msgLines) {
      lines.push(`${PASTEL.coral.fg}${line}${C.reset}`)
    }
  } else if (Array.isArray(message)) {
    for (const line of message) {
      lines.push(`${PASTEL.coral.fg}${line}${C.reset}`)
    }
  }
  
  return createBox(lines, { title, width, color: PASTEL.coral, ...opts })
}

function createInfoBox(title, message, opts = {}) {
  const { width = 50 } = opts
  const lines = []
  
  if (typeof message === "string") {
    const msgLines = message.split("\n")
    for (const line of msgLines) {
      lines.push(`${PASTEL.sky.fg}${line}${C.reset}`)
    }
  } else if (Array.isArray(message)) {
    for (const line of message) {
      lines.push(`${PASTEL.sky.fg}${line}${C.reset}`)
    }
  }
  
  return createBox(lines, { title, width, color: PASTEL.sky, ...opts })
}

function printSuccess(message) {
  console.log(`  ${PASTEL.mint.fg}${CHARMS.check}${C.reset} ${message}`)
}

function printWarning(message) {
  console.log(`  ${PASTEL.coral.fg}${CHARMS.warn}${C.reset} ${message}`)
}

function printInfo(message) {
  console.log(`  ${PASTEL.sky.fg}${CHARMS.info}${C.reset} ${message}`)
}

function printError(message) {
  console.log(`  ${PASTEL.coral.fg}${CHARMS.cross}${C.reset} ${message}`)
}

function printDim(message) {
  console.log(`  ${C.dim}${message}${C.reset}`)
}

function printSeparator(char = "─", width = 50) {
  console.log(`  ${C.brightBlack}${createLine(width, char)}${C.reset}`)
}

function printNewLine() {
  console.log("")
}

function printGradient(text, colors = [PASTEL.lavender, PASTEL.periwinkle, PASTEL.sky]) {
  const chars = text.split("")
  let result = ""
  chars.forEach((char, i) => {
    const colorIndex = i % colors.length
    result += `${colors[colorIndex].fg}${char}${C.reset}`
  })
  return result
}

export {
  C,
  PASTEL,
  CHARMS,
  createBox,
  createStatBox,
  createPromptBox,
  createHeader,
  createSuccessBox,
  createWarningBox,
  createInfoBox,
  printSuccess,
  printWarning,
  printInfo,
  printError,
  printDim,
  printSeparator,
  printNewLine,
  printGradient
}
