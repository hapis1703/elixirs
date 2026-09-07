import { google } from "googleapis";

const SHEET_ID = "1RZ-FGgL79PZ61SrCK7Al_wiJ44ACIcrrTnDxf1HTHQM";

// ponytail: reads env var. For local dev, ensure .env.local exists. For Vercel, set in dashboard.
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

async function getSheet(range) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range,
  });
  return res.data.values || [];
}

export async function getPengumuman() {
  const rows = await getSheet("Pengumuman!A:E");
  return rows.slice(1).map(([id, tanggal, judul, isi, pinned]) => ({
    id: Number(id),
    tanggal,
    judul,
    isi,
    pinned: String(pinned).toLowerCase() === "true",
  }));
}

export async function getGaleri() {
  const rows = await getSheet("Galeri!A:E");
  return rows.slice(1).map(([src, judul, tanggal, w, h]) => ({
    src,
    judul,
    tanggal,
    w: Number(w),
    h: Number(h),
  }));
}

export async function getMembers() {
  const rows = await getSheet("Anggota!A:E");
  // Header: nama, panggilan, jabatan, lahir, ig
  return rows.slice(1).map(([nama, panggilan, jabatan, lahir, ig]) => ({
    nama,
    ...(panggilan && { panggilan }),
    ...(jabatan && { jabatan }),
    ...(lahir && { lahir }),
    ...(ig && { ig }),
  }));
}

export async function getSchedule() {
  const rows = await getSheet("Jadwal!A:F");
  // Header: hari, mulai, selesai, mapel, jam, tipe
  const byDay = {};
  const dayIndex = { Senin: 1, Selasa: 2, Rabu: 3, Kamis: 4, Jumat: 5, Sabtu: 6, Minggu: 0 };

  for (const [hari, mulai, selesai, mapel, jam, tipe] of rows.slice(1)) {
    if (!hari) continue;
    if (!byDay[hari]) byDay[hari] = { hari, index: dayIndex[hari] ?? 0, slots: [] };
    const slot = { mulai, selesai, mapel };
    if (jam) slot.jam = jam;
    if (tipe) slot.tipe = tipe;
    byDay[hari].slots.push(slot);
  }

  return Object.values(byDay).sort((a, b) => a.index - b.index);
}