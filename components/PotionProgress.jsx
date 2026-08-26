"use client";

import { useEffect, useState } from "react";

// Scroll progress bar ala tabung reaksi: cairan gradien naik saat scroll.
export default function PotionProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="potion-progress" aria-hidden>
      <div className="potion-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
