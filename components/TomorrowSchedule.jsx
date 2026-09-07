"use client";

import { useEffect, useState } from "react";

export default function TomorrowSchedule() {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    fetch(`/api/schedule?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setSchedule(data))
      .catch(console.error);
  }, []);

  if (!schedule) return <p className="text-sm opacity-60">Memuat jadwal…</p>;

  const nextDay = (new Date().getDay() + 1) % 7;
  const d = schedule.find((s) => s.index === nextDay);

  if (!d) {
    return (
      <div className="bcard bg-blue p-5">
        <p className="font-display text-lg font-bold">Besok libur! 🎉</p>
        <p className="mt-1 text-sm">Tidak ada jadwal pelajaran besok.</p>
      </div>
    );
  }

  return (
    <div className="bcard bg-white p-5">
      <p className="mb-3 font-display text-xl font-extrabold">Jadwal Besok · {d.hari}</p>
      <ul className="space-y-2">
        {d.slots.map((s, i) => {
          const isBreak = s.tipe === "break";
          return (
            <li
              key={i}
              className={`flex items-center justify-between rounded-lg border-2 border-ink px-3 py-2 text-xs font-semibold ${
                isBreak ? "bg-transparent opacity-50" : "bg-cream"
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
