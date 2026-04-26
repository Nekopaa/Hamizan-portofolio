# 🕹️ Hamizan Arfa — Retro Pixel-Art Portfolio

Website portfolio single-page bergaya **Retro Pixel-Art & Gamified** untuk GitHub Pages.

---

## 🗂️ Struktur Folder

```
PORTOFOLIO/
├── index.html              ← Satu-satunya halaman (Home + About + Portfolio + Contact)
├── css/
│   └── style.css           ← Semua styling (warna, font, layout, cursor, responsif)
├── js/
│   └── main.js             ← Semua JavaScript (scroll-spy, animasi, filter, modal, form)
└── assets/
    ├── images/
    │   └── profile.png     ← FOTO PROFIL KAMU (ganti file ini)
    └── certificates/       ← GAMBAR SERTIFIKAT KAMU
        ├── juara1.jpg
        ├── exploration.png
        └── widyatama.png
```

---

## 🚀 Cara Menjalankan (VS Code + Live Server)

1. Buka VS Code → **File → Open Folder** → pilih folder `PORTOFOLIO`
2. Install ekstensi **Live Server** (oleh Ritwick Dey)
3. Klik kanan `index.html` → **Open with Live Server**
4. Browser buka: `http://127.0.0.1:5500/index.html`

---

## 📤 Upload ke GitHub Pages

```bash
git init
git add .
git commit -m "feat: retro pixel portfolio"
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

Lalu di GitHub: **Settings → Pages → Source: main → / (root) → Save**

Website live di: `https://USERNAME.github.io/REPO`

---

## ✏️ Panduan Kustomisasi

### 1. Ganti Nama & Teks

Buka `index.html`, cari dan ganti:

| Cari | Ganti dengan |
|------|------|
| `HAMIZAN ARFA` | Nama kamu |
| `High School Student & UI/UX...` | Deskripsi kamu |
| `data-target="10"` | Jumlah project kamu |
| `data-target="5"` | Jumlah sertifikat kamu |
| `Hamizan Arfa` di bagian biodata | Info pribadi kamu |

---

### 2. Ganti Foto Profil

- Simpan foto kamu sebagai: **`assets/images/profile.png`**
- Rasio terbaik: **persegi (1:1)**, minimal 400×400 px

**Atur crop foto** → buka `css/style.css`, cari `.profile-img`:

```css
.profile-img {
  height: 220px;         /* ← Ubah ini: kecil = crop lebih, besar = crop kurang */
  object-position: top;  /* ← Ubah ini: "top" dari atas, "50% 20%" geser bawah */
}
```

Contoh nilai `height`:
- `180px` → hanya kepala
- `220px` → kepala + bahu *(default)*
- `300px` → kepala + badan atas

---

### 3. Ganti Warna Tema

Buka `css/style.css`, cari `:root {` (baris ~12):

```css
:root {
  --bg-dark:      #0a0a0a;   /* Background halaman */
  --bg-card:      #1a1a2e;   /* Background kartu */
  --color-yellow: #f1fa8c;   /* Aksen kuning (judul) */
  --color-pink:   #ff79c6;   /* Aksen pink (border about) */
  --color-cyan:   #8be9fd;   /* Aksen cyan (border utama, cursor) */
  --color-green:  #50fa7b;   /* Status aktif */
  --color-purple: #bd93f9;   /* Filter badge, Behance */
}
```

---

### 4. Tambah Kartu Sertifikat Baru

1. Simpan gambar sertifikat di `assets/certificates/nama-file.jpg`
2. Buka `index.html`, cari `<!-- KARTU 1 -->`
3. Duplikasi satu blok `<article class="achievement-card">` dan ubah:

```html
<article class="achievement-card"
  data-category="KATEGORI"          <!-- ui-ux / webdev / design / course / award -->
  data-modal-title="Judul Sertifikat"
  data-modal-img="assets/certificates/nama-file.jpg"
  data-modal-desc="Diterbitkan oleh: ... | Tahun: ..."
  tabindex="0">
  
  <div class="card-header KATEGORI"> <!-- samakan dengan data-category -->
    <span class="card-header-title">LABEL HEADER</span>
    <span class="card-badge">CERT</span>
  </div>
  
  <div class="card-body">
    <img src="assets/certificates/nama-file.jpg" alt="..." loading="lazy"/>
    <div class="card-overlay">🔍 CLICK TO PREVIEW</div>
  </div>
  
  <div class="card-footer-info">
    <div class="card-title">Judul Sertifikat</div>
    <div class="card-meta">
      <span class="card-issuer">Nama Penerbit</span>
      <span>2025</span>
    </div>
  </div>
</article>
```

**Warna header per kategori:**
| `data-category` | Warna Header |
|---|---|
| `ui-ux` | Pink |
| `webdev` | Cyan |
| `design` | Kuning |
| `course` | Ungu |
| `award` | Hijau |

---

### 5. Ganti Link Sosial Media

Buka `index.html`, cari `id="link-github"`, `id="link-instagram"`, dst:

```html
<a href="https://github.com/USERNAME_KAMU" ...>
```

Ganti `USERNAME_KAMU` dengan username kamu di tiap platform.

Untuk email, cari:
```html
<a href="mailto:hamizan.arfa@email.com" ...>
```
Ganti dengan email kamu.

---

### 6. Tambah/Edit Skill Bar

Buka `index.html`, cari `[ SKILL TREE ]`, duplikasi blok:

```html
<div class="skill-label-row">
  <span class="skill-name">NAMA SKILL</span>
  <span class="skill-pct">70%</span>
</div>
<div class="skill-bar">
  <div class="skill-fill" data-skill="70"></div>  <!-- angka = persentase -->
</div>
```

---

### 7. Edit Timeline Quest Log

Buka `index.html`, cari `[ QUEST LOG ]`, duplikasi blok `<div class="timeline-entry">`:

```html
<div class="timeline-entry animate-hidden">
  <span class="timeline-dot" style="background:var(--color-cyan);"></span>
  <div class="timeline-year">2026</div>
  <div class="timeline-title">Judul Event</div>
  <div class="timeline-desc">Deskripsi singkat event ini.</div>
</div>
```

---

### 8. Cursor Pixel Art

Cursor sudah otomatis berganti jadi pixel art:
- **Default** → panah pixel berwarna **cyan** 🔵
- **Hover tombol/link** → bentuk pixel berwarna **pink** 🩷

Untuk menonaktifkan cursor custom, buka `css/style.css` dan hapus/comment baris `cursor: url(...)` di `body` dan `a, button, ...`.

---

### 9. Integrasi Form Contact (tanpa backend)

Daftar gratis di [Formspree.io](https://formspree.io):
1. Buat form → copy ID form (contoh: `xpwzabcd`)
2. Ubah tag `<form>` di `index.html`:
   ```html
   <form id="contact-form" action="https://formspree.io/f/xpwzabcd" method="POST">
   ```
3. Di `js/main.js`, hapus `e.preventDefault()` di fungsi `initContactForm()`

---

## 💡 Tips

- Semua gambar pakai `loading="lazy"` → halaman tetap cepat
- Setiap section punya `id="nama"` → navbar highlight otomatis saat scroll
- Kode sudah diberi komentar bahasa Indonesia di tiap bagian penting
