// Galeri foto kelas. Tambah entri baru = tambah objek di bawah + taruh file di public/gallery/.
// src: path di /public, mis. "/gallery/foto-kelas.webp". width/height: dimensi asli file (px).
//
// ponytail: kompres manual via `cwebp -q 72 -resize 1280 0 foto.jpg -o foto.webp`
// (Termux: pkg install libwebp). Upgrade: sharp di prebuild kalau foto makin banyak.

export const galeri = [
  {
    src: "/gallery/foto-kelas.webp",
    judul: "Foto Kelas XI-1.3",
    tanggal: "2026-07-28",
    w: 1280,
    h: 721,
  },
  {
    src: "/gallery/batik-day.webp",
    judul: "Lomba Agustusan 🇮🇩",
    tanggal: "2026-08-13",
    w: 1280,
    h: 720,
  },
  {
    src: "/gallery/momen-candid.webp",
    judul: "Lomba Agustusan 🇮🇩",
    tanggal: "2026-08-13",
    w: 1280,
    h: 720,
  },
  {
    src: "/gallery/heart-hands.webp",
    judul: "Couple Of The Year 💜",
    tanggal: "2026-08-13",
    w: 720,
    h: 1280,
  },
];
