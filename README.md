<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=700&size=30&duration=2500&pause=900&color=BDA4FF&center=true&vCenter=true&width=900&height=100&lines=XIYU+SKIP+SHORTLINK" alt="" width="100%" />
  <br />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15.5.27-111111?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19.1.0-20232a?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/Copyright-XIYU%20CODEX-e8a8bc?style=for-the-badge" />
  <br /><br />
  <img
    src="https://readme-typing-svg.demolab.com?font=Segoe+UI&weight=700&size=18&duration=1&pause=999999&color=E8A8BC&center=true&vCenter=true&width=850&height=35&lines=%F0%9F%94%97+Pilih+shortlink.+Tempel+URL.+Lanjutkan+proses."
    alt="Pilih shortlink. Tempel URL. Lanjutkan proses."
  />
  <br />
  <img
    src="https://readme-typing-svg.demolab.com?font=Segoe+UI&size=14&duration=1&pause=999999&color=777777&center=true&vCenter=true&width=850&height=30&lines=Tool+antarmuka+shortlink+dengan+tampilan+elegan%2C+responsif%2C+dan+animasi+halus."
    alt="Tool antarmuka shortlink dengan tampilan elegan, responsif, dan animasi halus."
  />
</div>

---

## ✨ Tentang XIYU SKIP SHORTLINK

**XIYU SKIP SHORTLINK** adalah aplikasi web untuk memilih layanan shortlink, memasukkan tautan, lalu menjalankan alur pemrosesan sesuai layanan yang dipilih. UI mempertahankan gaya visual XIYU: warna rose-pink, latar lembut, kartu glass, tipografi elegan, dan komponen interaktif.

> ⚠️ **Catatan integrasi:** Safelinku/SFL diproses melalui endpoint API XIYU. Platform lain dari daftar userscript BYPASS.VIP baru ditampilkan sebagai pilihan; engine/API resolver tidak tersedia di source yang diberikan, jadi tidak ada redirect eksternal.

## 🧭 Fitur

| Fitur | Keterangan |
|---|---|
| 🎛️ Pemilih shortlink | Dropdown berisi Safelinku/SFL dan platform yang tercantum dalam userscript BYPASS.VIP. |
| 🔗 Input tautan | Input URL dengan placeholder menyesuaikan layanan pilihan. |
| ⚙️ Proses Safelinku | Mengirim URL ke endpoint lokal `/api/bypass`, lalu meneruskan request ke API XIYU. |
| 🧾 Status resolver | Pilihan yang belum memiliki engine internal menampilkan penjelasan di XIYU; tidak ada redirect eksternal. |
| ⏳ Status proses | Animasi loading dan tahapan proses untuk alur Safelinku. |
| ✅ Hasil resolve | Menampilkan destination URL dan slug bila tersedia dari API. |
| 📋 Salin & buka | Menyalin destination URL atau membukanya di tab baru. |
| 🧹 Reset input | Tombol hapus untuk mengosongkan URL dan hasil. |
| 📱 Mobile-first | Layout responsif dengan lebar maksimum 560px. |
| 🎨 UI animatif | Glow latar, hover, spinner, transisi dropdown, dan animasi status. |

## 🧩 Pilihan shortlink

Dropdown menampilkan Safelinku/SFL (resolver API yang sudah terhubung di XIYU) dan platform/domain yang terdaftar pada userscript BYPASS.VIP yang diberikan sebagai referensi:

- Safelinku / SFL (resolver API XIYU yang tersedia)
- Linkvertise
- LootLabs (loot-labs.com, links.lootlabs.gg, lootlabs.com)
- Boost.ink
- Rekonise
- Sub2Unlock / Sub4Unlock (termasuk domain variasinya)
- Adfoc.us
- Cuty.io / Cety.app
- mboost.me / bst.gg / booo.st
- Paster.so / Paster.gg
- Social Unlock / SocialWolvez
- YTSUBME
- V.GD
- Other BYPASS.VIP-supported domains (domain lain yang tercantum pada userscript)

Work.ink, Lockr, dan AdMaven tidak tercantum pada `@match` userscript yang diberikan, sehingga tidak ditampilkan sebagai opsi.

**Penting:** userscript BYPASS.VIP yang tersedia hanya mengarahkan halaman ke layanan BYPASS.VIP dan menerima redirect URL. Itu bukan source engine/API resolver. Selain Safelinku/SFL, pilihan-pilihan di dropdown untuk saat ini hanya daftar platform yang tercantum; XIYU menampilkan status keterbatasan di halaman XIYU dan **tidak membuka, tidak redirect, dan tidak memindahkan pengguna ke website resolver eksternal**.

## 🚀 Menjalankan secara lokal

**Persyaratan:** Node.js yang kompatibel dengan Next.js 15 dan npm.

```bash
# 1. Ekstrak project, lalu masuk ke folder project
cd AIXI-SAFELINKU-main

# 2. Pasang dependency
npm install

# 3. Jalankan development server
npm run dev
```

Buka `http://localhost:3000` di browser.

### Build production

```bash
npm run build
npm start
```

## 🔄 Alur kerja

```text
Pilih layanan → Tempel URL → Klik RESOLVE LINK
                                │
                ┌───────────────┴────────────────┐
                │                                │
          Safelinku / SFL                Pilihan lainnya
                │                                │
        POST /api/bypass              Status keterbatasan
                │                     ditampilkan di XIYU
        XIYU API /bypass              tanpa redirect eksternal
                │
        Destination URL
                │
         Copy / Buka
```

## 🛠️ Endpoint yang digunakan

### Endpoint internal Next.js

`POST /api/bypass`

Request body:

```json
{
  "url": "https://sfl.gl/example"
}
```

Route ini memvalidasi URL tidak kosong, lalu meneruskan request ke API XIYU. Response JSON dari upstream diteruskan kembali ke frontend. Jika upstream memberi JSON tidak valid atau request gagal, route mengembalikan error.

### Upstream API Safelinku

Base URL yang digunakan source code:

```text
https://xiyu-safelinku-api.vercel.app
```

Frontend API information juga mencantumkan endpoint berikut:

- `GET /bypass?url=https://sfl.gl/example`
- `GET /bypass?slug=example`
- `GET /api/health`

> Endpoint di atas merupakan informasi API upstream yang ditampilkan aplikasi. Source project ini hanya menyertakan route proxy Next.js `POST /api/bypass`, bukan source backend upstream.

### Platform lain

Platform lain saat ini belum memiliki engine resolver internal pada repository ini. UI tidak memanggil website resolver eksternal dan tidak melakukan redirect. Source userscript BYPASS.VIP yang diberikan hanya menunjukkan daftar `@match` dan alur pemanggilan layanan eksternal; source API/engine resolver tidak disertakan.

## 📁 Struktur project

```text
AIXI-SAFELINKU-main/
├── app/
│   ├── api/
│   │   └── bypass/
│   │       └── route.ts       # Proxy API Safelinku
│   ├── globals.css            # Tema, layout, dan animasi UI
│   ├── layout.tsx             # Metadata dan root layout
│   └── page.tsx               # UI dan alur interaksi
├── docs/
│   └── xiyu-banner.svg         # Banner SVG animasi README
├── public/
│   └── hero.jpg                # Gambar hero aplikasi
├── package.json
└── README.md
```

## 🎨 Identitas visual

- **Palet:** rose-pink, dusty pink, putih lembut, dan charcoal.
- **Gaya:** clean, glassmorphism, rounded cards, dan tipografi elegan.
- **Animasi:** glow, spinner, indikator status, hover, dan transisi dropdown.
- **Banner README:** SVG dengan orbit, sparkle, glow, dan panel UI yang bergerak halus.

Sebagian platform Git hosting dapat membatasi animasi SVG demi keamanan. Banner tetap tampil sebagai gambar statis bila animasinya tidak didukung.

## 🔐 Penggunaan yang bertanggung jawab

Gunakan tool hanya pada tautan yang memang boleh kamu akses dan proses. Hormati ketentuan layanan shortlink, situs tujuan, serta hak pemilik konten. Jangan gunakan untuk melewati akses berbayar, autentikasi, atau pembatasan keamanan.

## © Copyright

**© XIYU CODEX. All rights reserved.**

XIYU SKIP SHORTLINK, identitas visual, dan dokumentasi ini merupakan bagian dari project XIYU CODEX. Jangan menghapus atribusi copyright saat mendistribusikan ulang. Penggunaan atau distribusi ulang source code harus mengikuti izin dari pemilik project.

<div align="center">
  <img src="docs/xiyu-banner.svg" alt="XIYU CODEX animated mark" width="72%" />
  <br />
  <sub>Made with 💗, clean code, and a little sparkle ✦</sub>
</div>
