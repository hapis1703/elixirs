"use client";

import { useState } from "react";
import { PotionBottle } from "@/components/Doodles";
import { Star, Bubbles } from "@/components/Doodles";

const WARNA = ["#9b5de5", "#ff5d8f", "#4cc9f0", "#b8e986", "#ffc700"];

// Hero potion interaktif: klik/tap botol → cairan ganti warna + muncrat gelembung.
export default function MagicPotion() {
  const [idx, setIdx] = useState(0);
  const [splash, setSplash] = useState([]);

  function pop(e) {
    setIdx((i) => (i + 1) % WARNA.length);
    // gelembung muncrat dari posisi klik
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * 100;
    const drops = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + "-" + i,
      x: cx,
      d: Math.random() * 0.3,
      c: WARNA[(idx + i) % WARNA.length],
    }));
    setSplash((s) => [...s.slice(-12), ...drops]);
    setTimeout(() => setSplash((s) => s.filter((d) => !drops.includes(d))), 900);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={pop}
        aria-label="Ramuan ajaib — pencet buat ganti warna"
        className="floaty block cursor-pointer outline-none"
      >
        {/* override warna cairan lewat CSS var lokal */}
        <div style={{ ["--color-purple" /* ponytail: reuse slot var untuk warna cairan dinamis */]: WARNA[idx] }}>
          <PotionBottle size={200} />
        </div>
      </button>

      {/* muncrat */}
      <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
        {splash.map((d) => (
          <span
            key={d.id}
            className="bubble-pop block h-4 w-4"
            style={{
              left: `${d.x}%`,
              top: "55%",
              background: d.c,
              animationDelay: `${d.d}s`,
            }}
          />
        ))}
      </div>

      <Star className="absolute -right-6 top-2 floaty" size={26} style={{ ["--rot"]: "14deg" }} />
      <Bubbles className="absolute -left-8 bottom-8 floaty" size={44} />
      <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-widest opacity-50">
        pencet aku!
      </p>
    </div>
  );
}
