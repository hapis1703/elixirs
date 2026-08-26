"use client";

import { useEffect, useState } from "react";
import { members } from "@/data/members";

// Birthday mode: kalau hari ini ada yang ulang tahun (field lahir "MM-DD"),
// tampil badge confetti di atas halaman.
function ultahHariIni() {
  const now = new Date();
  const mmdd = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return members.filter((m) => m.lahir === mmdd);
}

export default function BirthdayBanner() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    setPeople(ultahHariIni());
  }, []);

  if (!people.length) return null;
  const nama = people.map((m) => m.panggilan || m.nama.split(" ")[0]).join(" & ");
  const duo = people.length > 1;

  return (
    <div className="relative z-30 overflow-hidden border-b-2 border-ink bg-pink text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 px-4 py-2.5 text-sm font-bold">
        <span className="animate-bounce" aria-hidden>🎉</span>
        <p className="text-center">
          {duo ? (
            <>
              Hari ini dobel! 🎂 Selamat ulang tahun, <strong>{nama}</strong> — semoga ramuan
              kalian makin manis 🧪💜
            </>
          ) : (
            <>
              Selamat ulang tahun, <strong>{nama}</strong>! Semoga ramuan hidupmu makin manis 🧪💜
            </>
          )}
        </p>
      </div>
      {/* confetti titik-titik */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        {["10%", "25%", "40%", "55%", "70%", "85%"].map((left, i) => (
          <span
            key={left}
            className="absolute top-1 block h-1.5 w-1.5 rounded-full bg-white"
            style={{
              left,
              animation: `floaty ${1.4 + i * 0.2}s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
