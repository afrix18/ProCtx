# Security Features

## Overview

ProCtx now includes comprehensive security features to prevent accidentally exposing sensitive data:

## 1. Sensitive File Detection

Automatically skips scanning these files:
- `.env`, `.env.local`, `.env.production`, `.env.development`
- `credentials.json`, `secrets.json`
- `service-account.json`, `firebase-adminsdk.json`
- `.aws/credentials`
- `.ssh/id_rsa`, `.ssh/id_ed25519`
- `config/secrets.yml`, `config/credentials.yml.enc`

## 2. Secret Pattern Detection

Detects potential secrets in code:
- API keys (patterns like `sk_`, `pk_`, `AIza...`)
- GitHub tokens (`ghp_`, `gho_`)
- JWT tokens
- Private keys (PEM format)
- UUIDs in sensitive contexts
- OAuth tokens

## 3. Hardcoded Secret Detection

Scans for hardcoded secrets with patterns like:
- `API_KEY = "..."`
- `SECRET_TOKEN = "..."`
- `PASSWORD = "..."`
- Any variable name containing: `secret`, `password`, `token`, `auth`, `credential`, `key`

## 4. Auto .gitignore Management

When running `proctx init`, automatically:
- Creates `.gitignore` if missing
- Adds `.ai/` and `.opencode/` to `.gitignore`
- Preserves existing `.gitignore` entries

## 5. Data Redaction

Sensitive keys in configuration files are automatically redacted in output:
- Any key containing `secret`, `password`, `token`, etc. → `[REDACTED]`

## Usage

### Initialize with Security
```bash
proctx init
```
Output:
```
✅ Updated .gitignore with: .ai/, .opencode/
✅ Initialized .ai/ folder with templates
🔒 .ai/ and .opencode/ are now in .gitignore
```

### Bootstrap with Security Scanning
```bash
proctx bootstrap
```
Output:
```
🔒 Skipped 3 sensitive files
⚠️  Security Warnings (2):
   src/config.js:15 - Potential secret or API key detected
   src/auth.js:22 - Hardcoded secret in key: API_KEY
```

## API

### Security Utilities

```javascript
import { 
  isSensitiveFile, 
  scanForSecrets, 
  containsSensitiveKey,
  redactSensitiveData 
} from "./utils/security.js"

// Check if file is sensitive
isSensitiveFile(".env") // true

// Scan code for secrets
const warnings = scanForSecrets(code, "myfile.js")

// Redact sensitive data
const safe = redactSensitiveData({ 
  apiKey: "secret123", 
  port: 3000 
})
// { apiKey: "[REDACTED]", port: 3000 }
```

## Files

- `src/utils/security.js` - Security patterns and detection
- `src/utils/gitignore-manager.js` - .gitignore management
- `src/core/file-scanner.js` - File scanning with security filters
- `src/core/parser.js` - Safe parsing with secret detection
