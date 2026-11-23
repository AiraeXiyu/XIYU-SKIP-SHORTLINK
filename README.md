::: {align="center"}
`<img src="https://capsule-render.vercel.app/api?type=waving&color=0:211827,45:493044,100:CB799B&height=220&section=header&text=XIYU%20SKIP%20SHORTLINK&fontSize=36&fontColor=FCEAF2&animation=fadeIn&fontAlignY=38&desc=SELECT%20%E2%80%A2%20PASTE%20%E2%80%A2%20RESOLVE&descSize=15&descAlignY=58" width="100%" alt="XIYU SKIP SHORTLINK animated SVG banner"/>`{=html}

`<img src="https://img.shields.io/badge/PROJECT-XIYU%20CODEX-CB799B?style=for-the-badge&logo=github&logoColor=FFFFFF" alt="XIYU CODEX"/>`{=html}
`<img src="https://img.shields.io/badge/SHORTLINK-RESOLVER-493044?style=for-the-badge&logo=linktree&logoColor=FFFFFF" alt="Shortlink resolver"/>`{=html}
`<img src="https://img.shields.io/badge/UI-MOBILE%20FIRST-6C4058?style=for-the-badge&logo=responsive&logoColor=FFFFFF" alt="Mobile first"/>`{=html}

`<br/>`{=html}

### 🔗 Pilih shortlink · Tempel URL · Jalankan proses

`<sub>`{=html}Elegant dark-pink interface • Responsive layout • Animated
UI`</sub>`{=html}
:::

------------------------------------------------------------------------

::: {align="center"}
`<img src="https://capsule-render.vercel.app/api?type=rect&color=0:211827,100:70435C&height=90&section=header&text=ABOUT%20THE%20PROJECT&fontSize=25&fontColor=FCEAF2&animation=fadeIn&fontAlignY=55" width="100%" alt="About the project section"/>`{=html}
:::

## 💗 XIYU SKIP SHORTLINK

**XIYU SKIP SHORTLINK** adalah aplikasi web untuk memilih layanan
shortlink, memasukkan tautan, lalu menjalankan alur pemrosesan sesuai
layanan yang dipilih.

Aplikasi mempertahankan UI lama XIYU dengan identitas baru: tema
rose-pink dan charcoal, kartu rounded, efek glow, dropdown berdesain,
serta animasi transisi. Fokusnya tetap sederhana: pengguna memilih
layanan dari atas kolom input, memasukkan URL, lalu menekan tombol
proses.

> **Catatan integrasi:** Safelinku/SFL diproses melalui endpoint API
> XIYU. Delapan pilihan lainnya saat ini membuka resolver eksternal
> BypassLinks di tab baru. Opsi tersebut belum memakai backend internal
> yang sama dengan Safelinku.

::: {align="center"}
`<img src="https://img.shields.io/badge/9-SHORTLINK%20OPTIONS-CB799B?style=for-the-badge"/>`{=html}
`<img src="https://img.shields.io/badge/1-UNIFIED%20INTERFACE-493044?style=for-the-badge"/>`{=html}
`<img src="https://img.shields.io/badge/ANIMATED-UI-6C4058?style=for-the-badge"/>`{=html}
:::

------------------------------------------------------------------------

::: {align="center"}
`<img src="https://capsule-render.vercel.app/api?type=rect&color=0:211827,100:70435C&height=90&section=header&text=FEATURES&fontSize=27&fontColor=FCEAF2&animation=fadeIn&fontAlignY=55" width="100%" alt="Features section"/>`{=html}
:::

## ✨ Fitur Utama

```{=html}
<table>
```
```{=html}
<tr>
```
```{=html}
<td width="50%" valign="top">
```
### 🎛️ Pemilih shortlink

Dropdown berdesain di atas kolom input. Pengguna dapat memilih layanan
tanpa berpindah halaman.

```{=html}
</td>
```
```{=html}
<td width="50%" valign="top">
```
### 🔗 Input URL

Kolom untuk memasukkan tautan shortlink. Placeholder mengikuti layanan
yang dipilih.

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr>
```
```{=html}
<td width="50%" valign="top">
```
### ⚙️ Proses Safelinku

Mengirim URL ke endpoint internal `/api/bypass`, lalu meneruskan request
ke API XIYU.

```{=html}
</td>
```
```{=html}
<td width="50%" valign="top">
```
### 🌐 Resolver eksternal

Delapan pilihan tambahan membuka BypassLinks di tab baru. Hasil
bergantung pada layanan eksternal.

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr>
```
```{=html}
<td width="50%" valign="top">
```
### ⏳ Status proses

Alur Safelinku menampilkan status proses dan hasil pemrosesan.

```{=html}
</td>
```
```{=html}
<td width="50%" valign="top">
```
### 📋 Aksi hasil

Destination URL dapat disalin atau dibuka. Tombol reset membersihkan
input dan hasil.

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
</table>
```

------------------------------------------------------------------------

::: {align="center"}
`<img src="https://capsule-render.vercel.app/api?type=rect&color=0:211827,100:70435C&height=90&section=header&text=SUPPORTED%20SHORTLINKS&fontSize=25&fontColor=FCEAF2&animation=fadeIn&fontAlignY=55" width="100%" alt="Supported shortlinks section"/>`{=html}
:::

## 🔗 Daftar layanan

   \#  Layanan           Integrasi
  ---- ----------------- --------------------
   01  Safelinku / SFL   API XIYU
   02  Linkvertise       Resolver eksternal
   03  Work.ink          Resolver eksternal
   04  LootLabs          Resolver eksternal
   05  Lockr             Resolver eksternal
   06  Rekonise          Resolver eksternal
   07  Boost.ink         Resolver eksternal
   08  Sub2Unlock        Resolver eksternal
   09  AdMaven           Resolver eksternal

------------------------------------------------------------------------

::: {align="center"}
`<img src="https://capsule-render.vercel.app/api?type=rect&color=0:211827,100:70435C&height=90&section=header&text=HOW%20IT%20WORKS&fontSize=27&fontColor=FCEAF2&animation=fadeIn&fontAlignY=55" width="100%" alt="How it works section"/>`{=html}
:::

## 🔄 Alur kerja

``` mermaid
flowchart TD
    A["🎛️ Pilih layanan"] --> B["🔗 Masukkan URL"]
    B --> C["⚡ Jalankan proses"]
    C --> D{"Layanan dipilih?"}
    D -->|Safelinku / SFL| E["API internal XIYU"]
    E --> F["Destination URL"]
    F --> G["📋 Salin atau buka"]
    D -->|8 layanan lain| H["Resolver BypassLinks"]
    H --> I["🌐 Dibuka di tab baru"]
    style A fill:#493044,stroke:#CB799B,color:#FFFFFF
    style B fill:#493044,stroke:#CB799B,color:#FFFFFF
    style C fill:#6C4058,stroke:#E8A8BC,color:#FFFFFF
    style D fill:#211827,stroke:#CB799B,color:#FFFFFF
    style E fill:#493044,stroke:#CB799B,color:#FFFFFF
    style F fill:#6C4058,stroke:#E8A8BC,color:#FFFFFF
    style G fill:#493044,stroke:#CB799B,color:#FFFFFF
    style H fill:#493044,stroke:#CB799B,color:#FFFFFF
    style I fill:#6C4058,stroke:#E8A8BC,color:#FFFFFF
```

------------------------------------------------------------------------

::: {align="center"}
`<img src="https://capsule-render.vercel.app/api?type=rect&color=0:211827,100:70435C&height=90&section=header&text=INSTALLATION&fontSize=27&fontColor=FCEAF2&animation=fadeIn&fontAlignY=55" width="100%" alt="Installation section"/>`{=html}
:::

## 🚀 Instalasi lokal

**Persyaratan:** Node.js yang kompatibel dengan Next.js project dan npm.

### 1. Masuk ke folder project

``` bash
cd AIXI-SAFELINKU-main
```

### 2. Install dependency

``` bash
npm install
```

### 3. Jalankan development server

``` bash
npm run dev
```

Buka `http://localhost:3000` di browser.

### Build production

``` bash
npm run build
npm start
```

------------------------------------------------------------------------

::: {align="center"}
`<img src="https://capsule-render.vercel.app/api?type=rect&color=0:211827,100:70435C&height=90&section=text&text=API%20REFERENCE&fontSize=27&fontColor=FCEAF2&animation=fadeIn&fontAlignY=55" width="100%" alt="API reference section"/>`{=html}
:::

## ⚙️ Endpoint

### API internal

``` http
POST /api/bypass
Content-Type: application/json
```

Request body:

``` json
{
  "url": "https://sfl.gl/example"
}
```

Route internal meneruskan URL ke API Safelinku XIYU dan mengembalikan
response ke frontend.

### API upstream Safelinku

``` text
https://xiyu-safelinku-api.vercel.app
```

Endpoint yang dirujuk aplikasi:

-   `GET /bypass?url=<shortlink-url>`
-   `GET /bypass?slug=<slug>`
-   `GET /api/health`

Source aplikasi ini menyertakan route proxy Next.js, bukan source
backend upstream.

### Resolver eksternal

Pilihan selain Safelinku membuka resolver dengan URL yang di-encode:

``` text
https://bypass-links.com/?url=<encoded-url>&ref=xiyu
```

Resolver dibuka di tab baru. Jika tidak terbuka, periksa apakah browser
memblokir pop-up.

------------------------------------------------------------------------

::: {align="center"}
`<img src="https://capsule-render.vercel.app/api?type=rect&color=0:211827,100:70435C&height=90&section=header&text=PROJECT%20STRUCTURE&fontSize=25&fontColor=FCEAF2&animation=fadeIn&fontAlignY=55" width="100%" alt="Project structure section"/>`{=html}
:::

## 📁 Struktur project

``` text
AIXI-SAFELINKU-main/
├── app/
│   ├── api/
│   │   └── bypass/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── hero.jpg
├── package.json
└── README.md
```

------------------------------------------------------------------------

::: {align="center"}
`<img src="https://capsule-render.vercel.app/api?type=rect&color=0:211827,100:70435C&height=90&section=VISUAL%20IDENTITY&text=VISUAL%20IDENTITY&fontSize=25&fontColor=FCEAF2&animation=fadeIn&fontAlignY=55" width="100%" alt="Visual identity section"/>`{=html}
:::

## 🎨 Identitas visual

::: {align="center"}
`<img src="https://img.shields.io/badge/ROSE%20PINK-CB799B?style=for-the-badge"/>`{=html}
`<img src="https://img.shields.io/badge/DEEP%20PURPLE-493044?style=for-the-badge"/>`{=html}
`<img src="https://img.shields.io/badge/CHARCOAL-211827?style=for-the-badge"/>`{=html}
`<img src="https://img.shields.io/badge/SOFT%20PINK-E8A8BC?style=for-the-badge"/>`{=html}
:::

-   **Glassmorphism:** kartu transparan dan efek blur.
-   **Soft glow:** pencahayaan lembut pada elemen visual.
-   **Rounded UI:** komponen dengan sudut membulat.
-   **Responsive layout:** menyesuaikan ukuran layar.
-   **Micro animation:** hover, loading, dropdown, dan transisi.

------------------------------------------------------------------------

::: {align="center"}
`<img src="https://capsule-render.vercel.app/api?type=waving&color=0:8B4969,55:493044,100:211827&height=180&section=footer&text=XIYU%20CODEX&fontSize=32&fontColor=FCEAF2&animation=fadeIn&fontAlignY=65" width="100%" alt="XIYU CODEX footer banner"/>`{=html}

`<img src="https://img.shields.io/badge/COPYRIGHT-©%20XIYU%20CODEX-E8A8BC?style=for-the-badge&logo=github&logoColor=FFFFFF" alt="Copyright XIYU CODEX"/>`{=html}

`<br/>`{=html}

`<sub>`{=html}© XIYU CODEX. All rights reserved.`</sub>`{=html}
`<br/>`{=html} `<sub>`{=html}XIYU SKIP SHORTLINK · AIXI
PROJECT`</sub>`{=html} `<br/>`{=html}`<br/>`{=html} `<sub>`{=html}🔗
Clean links. Clear flow. ✦`</sub>`{=html}
:::
