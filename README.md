# XI-1.3 Elixirs — Website Kelas

Website resmi kelas **XI-1.3 "Elixirs"** · SMAN 11 Kota Bekasi · TP 2026/2027.

Satu rumah digital buat 43 siswa: jadwal pelajaran yang update sendiri sesuai jam, profil anggota & struktur kelas, galeri momen, prestasi, sampai pengumuman kelas.

> Satu ramuan, seribu prestasi.

---

## Fitur

### Halaman

| Route | Deskripsi |
|---|---|
| `/` | Homepage: hero, marquee berjalan, jadwal hari ini (otomatis), pengumuman pinned, preview galeri, quick links |
| `/anggota` | 43 kartu siswa + avatar inisial + badge jabatan + pencarian nama + tilt 3D saat hover |
| `/struktur` | Organigram 4 level: wali kelas → ketua/wakil → bendahara/sekretaris → 4 seksi |
| `/jadwal` | Jadwal Senin–Jumat per hari dalam kartu warna-warni |
| `/galeri` | Masonry foto momen kelas dengan caption & tanggal |
| `/prestasi` | Timeline prestasi kelas (siap diisi) |
| `/pengumuman` | Daftar pengumuman; pinned tampil paling atas |

### Fitur Unggulan

- **Jadwal dinamis** — halaman home mendeteksi hari & jam dari browser, lalu menampilkan mapel yang sedang berlangsung dengan badge `SEDANG`. Sabtu/Minggu otomatis menampilkan layar libur.
- **Jam live** — halaman anggota menampilkan jam real-time + mapel berjalan.
- **Konten tanpa coding** — semua data siswa, jadwal, struktur, galeri, pengumuman, dan prestasi hidup di folder `data/`. Edit file → push → selesai.
- **Desain neo-brutalist playful** — border hitam tebal, hard shadow, palet kuning/pink/biru/lime/ungu di atas dasar cream bermotif grid ala buku tulis.
- **Animasi halus** — reveal on-scroll, transisi antar halaman, marquee dua arah (pause saat hover), botol potion melayang di hero — semua menghormati `prefers-reduced-motion`.
- **OG image dinamis** — preview link yang rapi saat dibagikan ke WhatsApp/Discord/IG, digenerate via `next/og`.

## Tech Stack

| Teknologi | Peran |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router) | Framework React, static prerender semua halaman |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling utility-first dengan design token `@theme` |
| [Tabler Icons](https://tabler.io/icons) | Ikon (jika dibutuhkan) |
| Font: Bricolage Grotesque + Plus Jakarta Sans | Display & body, via `next/font` |

Tidak ada database, tidak ada backend — seluruh konten adalah file statis, sehingga situs bisa di-host gratis di mana saja.

## Struktur Proyek

```
├── app/
│   ├── layout.jsx          # Root layout + font + metadata
│   ├── template.jsx        # Transisi masuk tiap navigasi halaman
│   ├── globals.css         # Design system: palet, komponen .bcard/.bbtn, animasi
│   ├── icon.svg            # Favicon potion 🧪
│   ├── opengraph-image.jsx # OG image dinamis (next/og)
│   ├── page.jsx            # Homepage
│   ├── anggota/page.jsx
│   ├── struktur/page.jsx
│   ├── jadwal/page.jsx
│   ├── galeri/page.jsx
│   ├── prestasi/page.jsx
│   └── pengumuman/page.jsx
├── components/
│   ├── Navbar.jsx          # Nav responsif + menu mobile
│   ├── Footer.jsx
│   ├── TodaySchedule.jsx   # Jadwal hari ini + badge "SEDANG"
│   ├── SectionHeading.jsx  # Heading sticker playful
│   ├── Reveal.jsx          # Animasi reveal on-scroll
│   └── Doodles.jsx         # SVG doodle: potion, gelembung, bintang, dll
├── data/
│   ├── members.js          # 43 siswa + info kelas + IG
│   ├── schedule.js         # Jadwal pelajaran Senin–Jumat
│   ├── struktur.js         # Organigram kelas
│   ├── content.js          # Pengumuman & prestasi
│   └── galeri.js           # Daftar foto galeri
└── public/gallery/         # File foto momen kelas
```

## Menjalankan Proyek

```bash
# install dependensi
npm install

# mode development (hot reload)
npm run dev

# build produksi + jalankan
npm run build
npm run start
```

Buka [http://localhost:3000](http://localhost:3000).

## Cara Update Konten

Semua tanpa menyentuh kode:

**Tambah pengumuman** — edit `data/content.js`:

```js
export const pengumuman = [
  {
    id: 2,
    tanggal: "2026-09-01",
    judul: "Ulangan Matematika",
    isi: "Jangan lupa belajar bab 3-4, ulangan Senin depan!",
    pinned: true, // opsional: pin ke atas + homepage
  },
];
```

**Tambah foto galeri** — taruh file di `public/gallery/`, lalu daftarkan di `data/galeri.js`:

```js
{
  src: "/gallery/nama-foto.jpg",
  judul: "Momen Kegiatan",
  tanggal: "2026-08-17",
  w: 1280, h: 720, // dimensi asli file
}
```

**Tambah prestasi** — edit array `prestasi` di `data/content.js`:

```js
{ tanggal: "2026-09-10", judul: "Juara 1 Lomba Cerdas Cermat", deskripsi: "...", pemenang: "Tim Elixirs" }
```

**Ubah jadwal / anggota / struktur** — edit `data/schedule.js`, `data/members.js`, atau `data/struktur.js`.

Setelah itu commit & push — hosting akan redeploy otomatis.

## Deploy

Situs ini full static sehingga mudah dideploy:

**Vercel (disarankan)**

1. Push repo ini ke GitHub.
2. Impor project di [vercel.com/new](https://vercel.com/new).
3. Selesai — setiap push akan redeploy otomatis.

Opsional: set `metadataBase` di `app/layout.jsx` ke domain final agar OG image memakai URL absolut.

## Kontribusi

Anggota XI-1.3 dipersilakan kontribusi:

1. Fork & branch baru (`feat/fitur-baru`).
2. Commit dengan pesan yang jelas.
3. Pull request — akan direview admin PubDok.

Untuk koreksi data (jadwal berubah, typo nama, dsb), cukup edit file terkait di folder `data/`.

## Kredit

Dibuat dengan 💜 oleh XI-1.3 Elixirs · SMAN 11 Kota Bekasi.

Instagram kelas: [@elixxirss](https://www.instagram.com/elixxirss)
