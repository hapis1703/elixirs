"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#ffc700", "#ff5d8f", "#4cc9f0", "#b8e986", "#9b5de5"];

// Gelembung kecil muncul saat kursor bergerak (desktop) / tap (mobile).
// Throttled + dimatikan di touch tanpa gerak & prefers-reduced-motion.
export default function BubbleTrail() {
  const last = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function spawn(x, y) {
      const now = Date.now();
      if (now - last.current < 90) return;
      last.current = now;

      const b = document.createElement("span");
      const size = 8 + Math.random() * 14;
      b.className = "bubble-pop";
      b.style.cssText =
        `left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;` +
        `background:${COLORS[(Math.random() * COLORS.length) | 0]}55;`;
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 700);
    }

    function onMove(e) {
      spawn(e.clientX, e.clientY);
    }
    function onTouch(e) {
      const t = e.touches[0];
      if (t) spawn(t.clientX, t.clientY);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return null;
}
