# ProCtx

> AI Project Context Manager

Scan → Compress → Handoff → Resume

ProCtx adalah sistem manajemen konteks proyek untuk AI Coding Agent.

Tujuannya adalah menjaga pengetahuan proyek tetap tersimpan tanpa harus membawa seluruh riwayat percakapan.

---

## Kenapa ProCtx?

Sebagian besar AI Coding Agent menyimpan informasi proyek di dalam chat.

Ketika proyek membesar:

50k token
→ 100k token
→ 200k token
→ Context Overflow

Akibatnya:

- AI mulai lupa konteks
- Harus menjelaskan ulang proyek
- Biaya token meningkat
- Respon lebih lambat
- Hallucination meningkat

ProCtx memisahkan:

Project State
≠
Conversation History

---

## Instalasi

### GitHub

```bash
npm install -g github:avarenza/proctx
```

Cek instalasi:

```bash
proctx 
```

---

## Memulai

### Inisialisasi

```bash
proctx init
```

Membuat folder:

```txt
.ai/
├── project-state.json
├── architecture.json
├── decisions.json
├── progress.json
├── next-task.json
└── handoff.json
```

### Analisis Proyek

```bash
proctx bootstrap
```

### Deteksi Framework & Arsitektur

```bash
proctx detect
```

### Kompres Konteks

```bash
proctx compress
```

### Buat Handoff

```bash
proctx handoff
```

### Lanjutkan Sesi

```bash
proctx resume
```

### Generate Prompt AI

```bash
proctx prompt
```

Menghasilkan prompt siap pakai untuk AI coding assistant (OpenCode, Claude Code, Cursor, dll.).

Prompt otomatis mendeteksi framework dan menyertakan:
- Aturan manajemen konteks universal
- Konvensi spesifik framework (Laravel, Vue, Next.js, Flutter, SOLID)
- Pattern arsitektur dari proyek Anda

Tinggal copy output dan paste ke AI assistant Anda.

---

## Contoh OpenCode

Prompt:

Baca seluruh file di dalam folder .ai/

Gunakan sebagai sumber kebenaran utama proyek.

Ikuti arsitektur dan keputusan yang sudah tersimpan.

---

## Agent yang Didukung

- OpenCode
- Claude Code
- RooCode
- Kiro

Rencana:

- VS Code Extension
- Cursor
- Windsurf

---

## Filosofi

Project State
≠
Conversation History

Riwayat percakapan bersifat sementara.

Pengetahuan proyek harus tetap tersimpan.

---

## Lisensi

MIT