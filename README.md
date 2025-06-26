# 🧠 Internal Chatbot

Chatbot internal sederhana berbasis regex NLP untuk menjawab pertanyaan seputar cuti, status karyawan, dan kebijakan internal lainnya.

---

📁 Gambaran struktur folder seperti berikut:

```
.
├── frontend/
│   ├── src/
│   └──...
├── mock-data/
│   ├── cek_cuti.json
│   └── ...
├── nlp/
│   ├── main.go
│   └── ...
├── Dockerfile
└── README.md
```

---

## 💬 Intent

#### 1. Mengenai cuti

#### 2. Mengenai THR

#### 3. Mengenai surat kontrak

#### 4. Mengenai status kepegawaian

#### 5. Mengenai BPJS

---

## 🏗️ Arsitektur Singkat

```
User (Frontend: Vite + React)
        |
        v
Backend API (Go + Gin)
        |
        v
Mock Data (JSON Static Files)
```

- Frontend dibangun dengan React + Vite untuk tampilan interaktif.
- Backend menggunakan Go dengan framework Gin untuk RESTful API dan pemrosesan intent.
- Tidak ada database: seluruh jawaban diambil dari file statis JSON (`mock-data/`).
- Matching intent menggunakan metode regex sederhana pada backend.

---

## 🧰 Teknologi & Alasan Pemilihan

| Komponen   | Teknologi      | Alasan                                                            |
| ---------- | -------------- | ----------------------------------------------------------------- |
| Frontend   | React + Vite   | Ringan, cepat, cocok untuk prototyping UI chat                    |
| Backend    | Go + Gin       | Performa tinggi, efisien, mudah untuk HTTP server & JSON handling |
| Komunikasi | REST API       | Sederhana dan cukup untuk kebutuhan antar frontend-backend        |
| NLP Engine | Regex Matching | Sederhana, ringan, cepat, kontrol penuh atas pola intent          |

---

## 🔍 Eksplorasi Alternatif

### ❓ Bagaimana jika pakai GPT / LLM?

- **Pro**:
  - Lebih fleksibel: tidak terbatas pada regex atau rule.
  - Bisa memahami pertanyaan dalam berbagai variasi.
- **Kontra**:
  - Membutuhkan API (biaya tambahan dan konektivitas internet).
  - Jawaban bisa tidak konsisten jika tidak dikontrol dengan baik.
  - Potensi kebocoran data jika tidak dihosting sendiri (on-prem).

### ❓ Bagaimana jika pakai Vector Store / RAG?

- **Pro**:
  - Bisa mencari jawaban berdasarkan kemiripan semantik, bukan kata kunci.
  - Bisa menjawab pertanyaan di luar template jika basis dokumen lengkap.
- **Kontra**:
  - Perlu proses embedding & indexing awal.
  - Tambah kompleksitas (butuh layanan vector DB seperti Pinecone, Weaviate, atau Qdrant).
  - Tidak cocok jika data sangat terstruktur & terbatas seperti dalam mock-data saat ini.

---

## 🚀 Cara Menjalankan Chatbot Secara Lokal

### 1. Clone Repo

```bash
git clone https://github.com/nama-akun/chatbot.git
cd chatbot
```

### 2. Jalankan Backend

#### a. Prasyarat

- Go 1.24+

#### b. Jalankan

```bash
cd nlp
go mod download
go run .
```

atau jika ingin menggunakan port lain

```bash
cd nlp
go mod download
PORT=[replace_port] go run .
```

> Server akan berjalan di `http://0.0.0.0:8080` atau sesuai port yang digunakan.

Dan jangan lupa ubah baris berikut di `nlp/response.go`

```
filePath := fmt.Sprintf("mock-data/%s.json", intent)
```

Menjadi

```
filePath := fmt.Sprintf("../mock-data/%s.json", intent)
```

### Alternatif: Menjalankan Backend dengan Docker

Jika ingin menjalankan chatbot backend dengan Docker:

```bash
# 1. Build image
docker build -t chatbot .

# 2. Jalankan container
docker run -p 8080:8080 chatbot
```

> Server akan berjalan di `http://0.0.0.0:8080` atau sesuai port yang digunakan.

### 3. Jalankan Frontend

#### a. Prasyarat

- Node.js 18+
- PNPM/NPM/Yarn

#### b. Jalankan

```bash
cd frontend
npm install
npm run dev
```

Jangan lupa untuk mengubah **endpointnya** di `src/api/message.ts` menjadi `http://localhost:8080/api/message` atau sesuai port backend yang dijalankan.

> Frontend akan berjalan di `http://localhost:5173` (atau sesuai konfigurasi Vite)

### 4. Testing

Coba buka UI dan ketik:

```
Berapa sisa cuti saya?
```

Jika backend aktif dan `mock-data/cek_cuti.json` terbaca, akan muncul respon yang sesuai.

---

## 🚀 Live Demo Endpoint

Chatbot telah berhasil dideploy di Vercel (Web) dan Railway (Service). Dapat diakses melalui:

**Web:**
https://chatbot-omega-six-46.vercel.app/

**Base URL:**  
https://chatbot-production-3c89.up.railway.app/

## 💬 Cara Mengakses API via `curl`

Kamu bisa mengirim pertanyaan ke chatbot melalui endpoint berikut:

**Endpoint:**  
`POST /api/message`

**Contoh Request:**

```bash
curl -X POST https://chatbot-backend.up.railway.app/api/message \
  -H "Content-Type: application/json" \
  -d '{"text": "Berapa sisa cuti saya?"}'
```

**Contoh Jawaban:**

```bash
{
"response": "Sisa cuti Anda adalah 12 hari."
}
```
