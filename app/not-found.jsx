"use client";

import Link from "next/link";
import { useState } from "react";
import { PotionBottle, Bubbles } from "@/components/Doodles";

const WARNA = ["#9b5de5", "#ff5d8f", "#4cc9f0", "#b8e986", "#ffc700"];

// 404: ramuan meledak — tiap klik botol "meledak" warna baru + partikel.
export default function NotFound() {
  const [booms, setBooms] = useState([]);
  const [shake, setShake] = useState(false);

  function boom() {
    setShake(true);
    setTimeout(() => setShake(false), 400);
    const parts = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + "-" + i,
      x: (Math.random() - 0.5) * 260,
      y: -(40 + Math.random() * 160),
      c: WARNA[(Math.random() * WARNA.length) | 0],
      r: Math.random() * 360,
    }));
    setBooms((b) => [...b.slice(-28), ...parts]);
    setTimeout(() => setBooms((b) => b.filter((p) => !parts.includes(p))), 1100);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      <p className="font-display text-7xl font-extrabold tracking-tight sm:text-8xl">404</p>
      <h1 className="mt-3 font-display text-xl font-extrabold sm:text-2xl">
        Ramuan ini tidak ada di rak manapun 🧪
        </h1>
      <p className="mt-2 max-w-sm text-sm opacity-70">
        Halaman yang kamu cari hilang seperti asap potion. Coba kembali ke rak utama.
      </p>

      {/* botol meledak */}
      <button
        type="button"
        onClick={boom}
        aria-label="Pencet ramuan buat meledak"
        className={`mt-6 cursor-pointer outline-none transition-transform ${shake ? "scale-90" : ""}`}
      >
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center" aria-hidden>
            {booms.map((p) => (
              <span
                key={p.id}
                className="absolute block h-3 w-3 rounded-full border-2 border-ink"
                style={{
                  background: p.c,
                  animation: `boom-fly 0.9s ease-out forwards`,
                  ["--bx"]: `${p.x}px`,
                  ["--by"]: `${p.y}px`,
                  ["--br"]: `${p.r}deg`,
                }}
              />
            ))}
          </div>
          <PotionBottle size={130} />
          <Bubbles className="absolute -right-4 top-0 opacity-70" size={36} />
        </div>
      </button>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-widest opacity-50">
        pencet botolnya!
      </p>

      <Link href="/" className="bbtn mt-8 bg-yellow px-5 py-2.5 text-sm font-bold">
        ← Kembali ke rak utama
      </Link>

      <style jsx global>{`
        @keyframes boom-fly {
          from { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          to { transform: translate(var(--bx), var(--by)) rotate(var(--br)); opacity: 0; }
        }
      `}</style>
    </main>
  );
}
