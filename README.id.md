# ProCtx - AI Project Context Manager

[![npm version](https://img.shields.io/npm/v/proctx)](https://www.npmjs.com/package/proctx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🇬🇧 English](./README.md)

**Kelola konteks proyek AI untuk semua agen AI coding.**

ProCtx secara otomatis memindai proyek Anda, mendeteksi framework dan pola arsitektur, dan menghasilkan file konteks terstruktur yang membantu asisten AI memahami codebase Anda.

## Mengapa ProCtx?

Asisten AI coding (Claude, GPT, Cursor, dll.) sering kehilangan konteks ketika:
- Proyek menjadi besar
- Butuh banyak sesi
- Context window overflow

**ProCtx mengatasi ini dengan:**
- ✅ Memindai struktur proyek otomatis
- ✅ Mendeteksi framework (Vue, React, Laravel, Node, dll.)
- ✅ Mengidentifikasi pola arsitektur (MVC, SOLID, CLI-tool, dll.)
- ✅ Menghasilkan file konteks terstruktur
- ✅ Bekerja dengan **semua agen AI** (agent-agnostic)

## Instalasi

```bash
npm install -g proctx
```

Atau gunakan tanpa instalasi:

```bash
npx proctx --help
```

## Quick Start

**3 perintah sederhana:**

```bash
# 1. Inisialisasi proyek
proctx init

# 2. Scan dan analisis
proctx scan

# 3. Dapatkan prompt AI
proctx prompt
```

### Apa yang Dilakukan Setiap Perintah

#### `proctx init`
- Membuat folder `.ai/` dengan file konteks
- Membuat `.proctx/detectors/` dengan konfigurasi detector
- Membuat `.opencode/skills/proctx/` dengan skill opencode
- Setup `.gitignore` (exclude `.ai/`, `.proctx/`, ignore `.opencode/` tapi track skills)

**Output:**
```
.ai/
├── project-state.json    # File konteks utama
├── architecture.json     # Pola arsitektur
├── decisions.json        # Keputusan proyek
├── progress.json         # Progress pekerjaan
├── next-task.json        # Info task selanjutnya
└── handoff.json          # Ringkasan handoff

.proctx/
└── detectors/
    ├── framework-detector.json
    ├── architecture-detector.json
    └── knowledge-extractor.json

.opencode/
└── skills/
    └── proctx/
        └── SKILL.md       # Definisi skill OpenCode
```

#### `proctx scan`
- Deteksi framework (Node, Vue, React, Laravel, dll.)
- Identifikasi pola arsitektur
- Ekstrak modules, routes, stores, services, commands
- Scan masalah keamanan (hardcoded secrets)
- Update `.ai/project-state.json` dan file terkait

**Contoh output:**
```
🔍 Scanning project...
🔒 Skipped 3 sensitive files
✅ Scan completed
📦 Framework: node
🏗️  Architecture: cli-tool
⚡ Commands: 3
📂 Modules: 0
📦 Dependencies: 12

💾 Updated: .ai/project-state.json, handoff.json, architecture.json
```

#### `proctx prompt`
- Generate prompt siap pakai untuk AI berdasarkan proyek Anda
- Bekerja dengan **semua agen AI** (Claude, GPT, Cursor, Windsurf, dll.)
- Termasuk instruksi spesifik framework
- Menghormati arsitektur dan konvensi yang ada

**Cara pakai:**
1. Jalankan `proctx prompt`
2. Copy output
3. Paste ke AI assistant Anda
4. AI sekarang memahami konteks proyek Anda!

## Cara Kerja

```
Proyek Anda
    ↓
proctx scan
    ↓
Deteksi: Framework, Arsitektur, Modul, Keamanan
    ↓
Generate: .ai/*.json (konteks terstruktur)
    ↓
proctx prompt
    ↓
Agen AI baca file .ai/
    ↓
AI memahami proyek Anda!
```

## Framework yang Didukung

ProCtx otomatis mendeteksi:

**Frontend:**
- Vue.js (2, 3)
- React
- Next.js
- Nuxt
- Svelte

**Backend:**
- Node.js
- Laravel
- Express
- NestJS

**Mobile:**
- Flutter

**Pola Arsitektur:**
- MVC
- SOLID
- CLI-tool
- Monorepo
- Microservices
- Clean Architecture

## Fitur Keamanan

ProCtx memiliki scanning keamanan built-in:

### 🔒 Proteksi File Sensitif
Otomatis skip:
- File `.env`
- `credentials.json`
- Private keys (`.pem`, `.key`)
- AWS credentials
- Firebase service accounts

### 🛡️ Deteksi Secret
Scan untuk:
- API keys (OpenAI, GitHub, AWS, dll.)
- Password dan token
- Hardcoded secrets
- JWT tokens
- Private keys

**Contoh warning:**
```
🔒 Skipped 2 sensitive files
⚠️  Security Warnings (1):
   src/config.js:15 - Hardcoded secret in key: API_KEY
```

## Struktur Proyek

```
.ai/                        # File konteks AI (gitignored)
├── project-state.json      # Konteks proyek utama
├── architecture.json       # Pola arsitektur
├── decisions.json          # Keputusan proyek
├── progress.json           # Progress kerja
├── next-task.json          # Task berikutnya
└── handoff.json            # Ringkasan handoff

.proctx/                    # Konfigurasi ProCtx (gitignored)
└── detectors/
    ├── framework-detector.json
    ├── architecture-detector.json
    └── knowledge-extractor.json

.opencode/                  # Integrasi OpenCode (skills di-track)
└── skills/
    └── proctx/
        └── SKILL.md        # Skill native OpenCode
```

## Contoh: project-state.json

```json
{
  "project": {
    "name": "ProCtx",
    "description": "AI Project Context Manager"
  },
  "framework": "node",
  "stack": ["node"],
  "architecture": "cli-tool",
  "commands": ["init", "scan", "prompt"],
  "modules": [],
  "routes": [],
  "stores": [],
  "services": [],
  "dependencies": 12,
  "features": [],
  "last_scan": "2026-06-20T04:15:00.000Z"
}
```

## Workflow

### Setup Pertama Kali
```bash
cd proyek-anda
proctx init
proctx scan
```

### Sebelum Sesi AI
```bash
proctx scan          # Update konteks
proctx prompt        # Dapatkan prompt untuk AI
# Paste prompt ke AI assistant
```

### Setelah Sesi AI
```bash
# AI update .ai/progress.json
# AI update .ai/decisions.json
# AI update .ai/next-task.json
```

### Handoff ke Agen Lain
```bash
proctx scan          # Refresh konteks
proctx prompt        # Generate prompt baru
# Agen baru baca .ai/handoff.json
```

## Konfigurasi

Konfigurasi detector disimpan di `.proctx/detectors/`:

- **framework-detector.json** - Aturan deteksi framework
- **architecture-detector.json** - Aturan pola arsitektur
- **knowledge-extractor.json** - Apa yang diekstrak (modules, routes, dll.)

Anda bisa customize sesuai kebutuhan proyek.

## Agen yang Didukung

ProCtx bekerja dengan:

- ✅ **OpenCode** — integrasi skill native (`.opencode/skills/proctx/`)
- ✅ Claude (Anthropic)
- ✅ ChatGPT (OpenAI)
- ✅ Cursor
- ✅ Windsurf
- ✅ GitHub Copilot
- ✅ Codeium
- ✅ Agen apapun yang bisa baca file proyek

**Kenapa agent-agnostic?**
- ProCtx generate file JSON standar
- Tidak ada format proprietary
- Tidak ada vendor lock-in
- Bekerja offline
- Version control friendly

## Referensi CLI

```bash
proctx init       # Inisialisasi proyek
proctx scan       # Scan dan analisis
proctx prompt     # Generate prompt AI
proctx --help     # Tampilkan bantuan
```

## FAQ

**T: Apakah file .ai/ harus di-commit ke git?**  
J: Tidak, sudah otomatis gitignored. Setiap developer jalankan `proctx scan` lokal.

**T: Bisakah pakai ProCtx dengan berbagai agen AI?**  
J: Ya! File `.ai/` yang sama bekerja dengan semua agen. ProCtx juga punya skill native untuk **OpenCode**.

**T: Apakah ProCtx kirim data ke server eksternal?**  
J: Tidak, semua berjalan lokal. Kode Anda tidak keluar dari mesin.

**T: Bisa customize aturan deteksi?**  
J: Ya, edit file di `.proctx/detectors/` sesuai kebutuhan.

**T: Bagaimana jika framework saya tidak terdeteksi?**  
J: Tambahkan ke `.proctx/detectors/framework-detector.json` dan submit PR!

## Kontribusi

Kontribusi sangat diterima!

1. Fork repo
2. Buat feature branch
3. Test dengan `npm test`
4. Submit PR

## Lisensi

MIT © afrix18

## Link

- **GitHub:** https://github.com/afrix18/proctx
- **npm:** https://www.npmjs.com/package/proctx
- **Issues:** https://github.com/afrix18/proctx/issues

---

**Dibuat dengan ❤️ untuk komunitas AI coding**
