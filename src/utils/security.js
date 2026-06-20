export const SECRET_PATTERNS = [
  /api[_-]?key/i,
  /secret/i,
  /password/i,
  /token/i,
  /auth/i,
  /credential/i,
  /private[_-]?key/i,
  /access[_-]?key/i,
  /client[_-]?secret/i,
  /encryption[_-]?key/i,
  /database[_-]?url/i,
  /db[_-]?password/i,
  /jwt[_-]?secret/i,
  /session[_-]?secret/i,
  /oauth/i,
  /bearer/i
]

export const SECRET_VALUE_PATTERNS = [
  /sk[_-][a-zA-Z0-9]{20,}/,
  /pk[_-][a-zA-Z0-9]{20,}/,
  /ghp[_-][a-zA-Z0-9]{36,}/,
  /gho[_-][a-zA-Z0-9]{36,}/,
  /AIza[a-zA-Z0-9_-]{35}/,
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
  /eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/,
  /-----BEGIN [A-Z ]+ PRIVATE KEY-----/
]

export const SENSITIVE_FILES = [
  ".env",
  ".env.local",
  ".env.production",
  ".env.development",
  ".env.test",
  "credentials.json",
  "secrets.json",
  "service-account.json",
  "firebase-adminsdk.json",
  ".aws/credentials",
  ".ssh/id_rsa",
  ".ssh/id_ed25519",
  "config/secrets.yml",
  "config/credentials.yml.enc"
]

export function isSensitiveFile(filePath) {
  const normalized = filePath.replace(/\\/g, "/").toLowerCase()
  return SENSITIVE_FILES.some(sf => normalized.endsWith(sf.toLowerCase()))
}

export function containsSensitiveKey(text) {
  return SECRET_PATTERNS.some(pattern => pattern.test(text))
}

export function containsSensitiveValue(text) {
  return SECRET_VALUE_PATTERNS.some(pattern => pattern.test(text))
}

export function scanForSecrets(content, filePath) {
  const warnings = []
  const lines = content.split(/\r?\n/)

  lines.forEach((line, index) => {
    const lineNum = index + 1

    for (const pattern of SECRET_VALUE_PATTERNS) {
      if (pattern.test(line)) {
        warnings.push({
          file: filePath,
          line: lineNum,
          type: "potential_secret",
          message: "Potential secret or API key detected"
        })
        break
      }
    }

    const keyValueMatch = line.match(/(['"]?)([A-Z_]+)\1\s*[:=]\s*(['"])([^'"]+)\3/)
    if (keyValueMatch) {
      const key = keyValueMatch[2]
      const value = keyValueMatch[4]

      if (containsSensitiveKey(key) && value && value.length > 10) {
        warnings.push({
          file: filePath,
          line: lineNum,
          type: "hardcoded_secret",
          message: `Hardcoded secret in key: ${key}`
        })
      }
    }
  })

  return warnings
}

export function redactSensitiveData(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj
  }

  const redacted = Array.isArray(obj) ? [] : {}

  for (const [key, value] of Object.entries(obj)) {
    if (containsSensitiveKey(key)) {
      redacted[key] = "[REDACTED]"
    } else if (typeof value === "object") {
      redacted[key] = redactSensitiveData(value)
    } else {
      redacted[key] = value
    }
  }

  return redacted
}
