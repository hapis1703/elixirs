// Jadwal XI-1.3 — TP 2026/2027. Mapel sama yang terpotong istirahat/mapel lain tetap dipisah.
// Format waktu "HH.MM". hari: 0=Minggu ... 5=Jumat.

export const schedule = [
  {
    hari: "Senin",
    index: 1,
    slots: [
      { mulai: "06.30", selesai: "07.30", mapel: "Upacara", tipe: "event" },
      { mulai: "07.30", selesai: "09.45", mapel: "PJOK", jam: "1–3" },
      { mulai: "09.45", selesai: "10.15", mapel: "Istirahat", tipe: "break" },
      { mulai: "10.15", selesai: "11.45", mapel: "B. Inggris", jam: "4–5" },
      { mulai: "11.45", selesai: "12.30", mapel: "Istirahat", tipe: "break" },
      { mulai: "12.30", selesai: "13.05", mapel: "B. Inggris", jam: "6" },
      { mulai: "13.05", selesai: "14.50", mapel: "PAI", jam: "7–9" },
    ],
  },
  {
    hari: "Selasa",
    index: 2,
    slots: [
      { mulai: "06.30", selesai: "06.50", mapel: "IMTAQ", tipe: "event" },
      { mulai: "06.50", selesai: "08.10", mapel: "Matematika", jam: "1–2" },
      { mulai: "08.10", selesai: "09.30", mapel: "B. Jepang", jam: "3–4" },
      { mulai: "09.30", selesai: "09.50", mapel: "Istirahat", tipe: "break" },
      { mulai: "09.50", selesai: "11.10", mapel: "P. Pancasila", jam: "5–6" },
      { mulai: "11.10", selesai: "11.50", mapel: "Biologi", jam: "7" },
      { mulai: "11.50", selesai: "12.45", mapel: "Istirahat", tipe: "break" },
      { mulai: "12.45", selesai: "13.30", mapel: "Biologi", jam: "8" },
      { mulai: "13.30", selesai: "14.50", mapel: "Kimia", jam: "9–10" },
    ],
  },
  {
    hari: "Rabu",
    index: 3,
    slots: [
      { mulai: "06.30", selesai: "06.50", mapel: "IMTAQ", tipe: "event" },
      { mulai: "06.50", selesai: "08.10", mapel: "Biologi", jam: "1–2" },
      { mulai: "08.10", selesai: "09.30", mapel: "B. Indonesia", jam: "3–4" },
      { mulai: "09.30", selesai: "09.50", mapel: "Istirahat", tipe: "break" },
      { mulai: "09.50", selesai: "11.10", mapel: "Informatika / Numerasi", jam: "5–6" },
      { mulai: "11.10", selesai: "11.50", mapel: "Fisika", jam: "7" },
      { mulai: "11.50", selesai: "12.45", mapel: "Istirahat", tipe: "break" },
      { mulai: "12.45", selesai: "13.30", mapel: "Fisika", jam: "8" },
      { mulai: "13.30", selesai: "14.50", mapel: "Matematika Lanjut", jam: "9–10" },
    ],
  },
  {
    hari: "Kamis",
    index: 4,
    slots: [
      { mulai: "06.30", selesai: "07.00", mapel: "IMTAQ", tipe: "event" },
      { mulai: "07.00", selesai: "08.20", mapel: "Fisika", jam: "1–2" },
      { mulai: "08.20", selesai: "09.00", mapel: "Sejarah", jam: "3" },
      { mulai: "09.15", selesai: "09.35", mapel: "Istirahat", tipe: "break" },
      { mulai: "09.35", selesai: "10.15", mapel: "Sejarah", jam: "4" },
      { mulai: "10.20", selesai: "11.50", mapel: "Matematika", jam: "5–6" },
      { mulai: "11.50", selesai: "12.30", mapel: "Istirahat", tipe: "break" },
      { mulai: "12.30", selesai: "13.50", mapel: "B. Indonesia", jam: "7–8" },
      { mulai: "13.50", selesai: "14.30", mapel: "P. Seni", jam: "9" },
    ],
  },
  {
    hari: "Jumat",
    index: 5,
    slots: [
      { mulai: "06.30", selesai: "06.50", mapel: "IMTAQ", tipe: "event" },
      { mulai: "06.50", selesai: "08.10", mapel: "Kimia", jam: "1–2" },
      { mulai: "08.10", selesai: "08.50", mapel: "BK / B. Sunda", jam: "3" },
      { mulai: "08.50", selesai: "09.30", mapel: "P. Seni", jam: "4" },
      { mulai: "09.30", selesai: "09.50", mapel: "Istirahat", tipe: "break" },
      { mulai: "10.00", selesai: "10.40", mapel: "P. Seni", jam: "5" },
      { mulai: "10.40", selesai: "11.20", mapel: "BK / B. Sunda", jam: "6" },
      { mulai: "11.20", selesai: "12.00", mapel: "Istirahat", tipe: "break" },
      { mulai: "13.00", selesai: "14.10", mapel: "Matematika Lanjut", jam: "7–8" },
    ],
  },
];

const toMin = (t) => {
  const [h, m] = t.split(".").map(Number);
  return h * 60 + m;
};

// Slot jadwal untuk waktu (Date) sekarang. Return null di luar jam sekolah / akhir pekan.
export function slotNow(date = new Date()) {
  const day = date.getDay();
  const d = schedule.find((s) => s.index === day);
  if (!d) return null;
  const mins = date.getHours() * 60 + date.getMinutes();
  return (
    d.slots.find((s) => mins >= toMin(s.mulai) && mins < toMin(s.selesai)) ?? null
  );
}

// Slots hari ini + data harinya.
export function today(date = new Date()) {
  const day = date.getDay();
  return schedule.find((s) => s.index === day) ?? null;
}
