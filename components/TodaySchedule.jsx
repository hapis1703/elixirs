"use client";

import { useEffect, useState } from "react";
import { slotNow, today } from "@/data/schedule";

// Jadwal hari ini + badge mapel berjalan. Client component karena bergantung jam browser.
export default function TodaySchedule() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  if (!now) return <p className="text-sm opacity-60">Memuat jadwal…</p>;

  const d = today(now);
  const current = slotNow(now);

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
      <ul className="flex flex-wrap gap-2">
        {d.slots.map((s, i) => {
          const isBreak = s.tipe === "break";
          const isActive = current === s;
          return (
            <li
              key={i}
              className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold ${
                isActive
                  ? "bg-yellow shadow-[2px_2px_0_var(--color-ink)]"
                  : isBreak
                    ? "bg-transparent opacity-50"
                    : "bg-cream"
              }`}
            >
              {isBreak ? s.mapel : `${s.mulai}–${s.selesai} · ${s.mapel}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
