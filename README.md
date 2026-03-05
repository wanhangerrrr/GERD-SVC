# MedCare Insight - GERD Detection System

Project 1: Sistem Deteksi Dini Penyakit Gastroesophageal Reflux Disease Menggunakan Support Vector Classifier.

## Deskripsi
Website ini adalah platform skrining kesehatan awal untuk mendeteksi risiko GERD berbasis AI. Menggunakan model klasifikasi Support Vector Machine (SVC) untuk menganalisis data klinis dan gaya hidup pengguna.

## Fitur Utama
- **Deteksi Dini GERD**: Form interaktif dengan validasi Zod untuk mengumpulkan data gejala.
- **Analisis AI**: Fallback logic ke mock prediction SVC dengan visualisasi faktor risiko via Recharts.
- **Dashboard Project**: Detail metodologi, pipeline model, dan metrik performa.
- **Responsif & Modern**: UI premium dengan Tailwind CSS, Shadcn/UI, dan dukungan Dark Mode.

## Instalasi & Cara Jalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Server Development
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Integrasi Model ML (Produksi)

Untuk menghubungkan ke API ML asli, tambahkan URL endpoint ke file `.env.local`:

```env
NEXT_PUBLIC_PREDICT_API_URL=http://your-ml-api.com
```

### Format Request (POST `/predict/gerd`)
```json
{
  "usia": 25,
  "jenis_kelamin": "Pria",
  "frekuensi_heartburn": 4,
  "regurgitasi": true,
  "nyeri_dada": false,
  "mual": true,
  "batuk_malam": false,
  "sulit_menelan": false,
  "bmi": 24.5,
  "perokok": false,
  "konsumsi_kopi": 2,
  "makan_malam_larut": true,
  "stress_level": 6
}
```

### Format Response (Expected)
```json
{
  "label": "Risiko Sedang",
  "probability": 0.72,
  "top_factors": ["frekuensi_heartburn", "perokok", "bmi"]
}
```

## Teknologi
- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI & Lucide React
- **Validation**: Zod & React Hook Form
- **Animation**: Framer Motion
- **Visualization**: Recharts
- **State/Theme**: Next-Themes
