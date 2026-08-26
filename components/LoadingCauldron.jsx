"use client";

import { useEffect, useState } from "react";
import { PotionBottle as PotionDoodle } from "@/components/Doodles";

// Splash cauldron: tampil saat pertama load per sesi, hilang setelah app siap.
// sessionStorage → cuma sekali per tab, navigasi berikutnya tidak mengulang.
export default function LoadingCauldron() {
  const [done, setDone] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("cauldron-seen") === "1";
    } catch {}
    if (seen) return;

    setDone(false);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("cauldron-seen", "1");
      } catch {}
    }, 1400);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div className={`cauldron-overlay ${done ? "done" : ""}`} aria-hidden>
      <div className="relative flex flex-col items-center">
        <div className="absolute -top-6 flex gap-2">
          {["bg-yellow", "bg-pink", "bg-blue", "bg-lime"].map((c, i) => (
            <span
              key={c}
              className={`cauldron-bubble block h-3 w-3 rounded-full border-2 border-ink ${c}`}
              style={{ animationDelay: `${i * 0.22}s` }}
            />
          ))}
        </div>
        <div className="cauldron-pot">
          <PotionDoodle size={110} />
        </div>
        <p className="mt-4 font-display text-sm font-bold tracking-widest uppercase opacity-70">
          Menyeduh ramuan...
        </p>
      </div>
    </div>
  );
}
