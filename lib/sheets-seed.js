import { google } from "googleapis";

const SHEET_ID = "1RZ-FGgL79PZ61SrCK7Al_wiJ44ACIcrrTnDxf1HTHQM";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

async function updateSheet(range, values) {
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: "RAW",
    requestBody: { values },
  });
}

export async function seedPengumuman(data) {
  const rows = [
    ["id", "tanggal", "judul", "isi", "pinned"],
    ...data.map((d) => [d.id, d.tanggal, d.judul, d.isi, String(d.pinned)]),
  ];
  await updateSheet("'Pengumuman'!A:E", rows);
}

export async function seedGaleri(data) {
  const rows = [
    ["src", "judul", "tanggal", "w", "h"],
    ...data.map((d) => [d.src, d.judul, d.tanggal, String(d.w), String(d.h)]),
  ];
  await updateSheet("'Galeri'!A:E", rows);
}

export async function seedMembers(data) {
  const rows = [
    ["nama", "panggilan", "jabatan", "lahir", "ig"],
    ...data.map((d) => [d.nama, d.panggilan || "", d.jabatan || "", d.lahir || "", d.ig || ""]),
  ];
  await updateSheet("'Anggota'!A:E", rows);
}

export async function seedSchedule(data) {
  // Flatten schedule array to rows: hari, mulai, selesai, mapel, jam, tipe
  const rows = [
    ["hari", "mulai", "selesai", "mapel", "jam", "tipe"],
    ...data.flatMap((day) =>
      day.slots.map((s) => [
        day.hari,
        s.mulai,
        s.selesai,
        s.mapel,
        s.jam || "",
        s.tipe || "",
      ])
    ),
  ];
  await updateSheet("'Jadwal'!A:F", rows);
}