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