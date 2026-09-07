"use client";

import { useEffect, useState } from "react";

// Helper: parse time string "HH.MM" to minutes since midnight
const toMin = (t) => {
  const [h, m] = t.split(".").map(Number);
  return h * 60 + m;
};

export default function TodaySchedule() {
  const [schedule, setSchedule] = useState(null);
  const [now, setNow] = useState(null);

  useEffect(() => {
    fetch(`/api/schedule?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setSchedule(data))
      .catch(console.error);

    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  if (!schedule || !now) return <p className="text-sm opacity-60">Memuat jadwal…</p>;

  const dayIndex = now.getDay(); // 0=Minggu ... 5=Jumat
  const d = schedule.find((s) => s.index === dayIndex);
  
  if (!d) {
    return (
      <div className="bcard bg-lime p-5">
        <p className="font-display text-lg font-bold">Hari libur! 🎉</p>
        <p className="mt-1 text-sm">
          Tidak ada jadwal pelajaran hari ini. Sampai jumpa Senin!
        </p>
      </div>
    );
  }

  const mins = now.getHours() * 60 + now.getMinutes();
  const current = d.slots.find((s) => mins >= toMin(s.mulai) && mins < toMin(s.selesai));

  return (
    <div className="bcard bg-white p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="font-display text-xl font-extrabold">Jadwal hari ini · {d.hari}</p>
        {current && current.tipe !== "break" && (
          <span className="animate-pulse rounded-full border-2 border-ink bg-pink px-3 py-0.5 text-xs font-bold text-white">
            SEDANG: {current.mapel}
          </span>
        )}
      </div>
      <ul className="space-y-2">
        {d.slots.map((s, i) => {
          const isBreak = s.tipe === "break";
          const isActive = current === s;
          return (
            <li
              key={i}
              className={`flex items-center justify-between rounded-lg border-2 border-ink px-3 py-2 text-xs font-semibold ${
                isActive
                  ? "bg-yellow shadow-[2px_2px_0_var(--color-ink)]"
                  : isBreak
                    ? "bg-transparent opacity-50"
                    : "bg-cream"
              }`}
            >
              <span>{isBreak ? s.mapel : s.mapel}</span>
              {!isBreak && <span className="opacity-60">{s.mulai}–{s.selesai}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
