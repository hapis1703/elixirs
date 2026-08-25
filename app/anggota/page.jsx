"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { members } from "@/data/members";
import { slotNow, today } from "@/data/schedule";

const palette = ["bg-yellow", "bg-blue", "bg-lime", "bg-pink text-white", "bg-purple text-white"];

// Hash nama -> warna stabil (bukan cycle mekanis per posisi).
function colorFor(nama) {
  let h = 0;
  for (let i = 0; i < nama.length; i++) h = (h * 31 + nama.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}

// Kartu anggota dengan tilt mengikuti kursor.
function MemberCard({ m, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  return (
    <li
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.18s ease",
        animationDelay: `${Math.min(index * 40, 500)}ms`,
      }}
      className={`bcard p-4 will-change-transform ${colorFor(m.nama)}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-white font-display font-extrabold text-ink">
        {m.nama.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
      </div>
      <p className="mt-3 text-sm font-bold leading-snug">{m.nama}</p>
      {m.jabatan && (
        <p className="mt-1 inline-block rounded-full border border-ink bg-white/70 px-2 py-0.5 text-[10px] font-bold text-ink">
          {m.jabatan}
        </p>
      )}
    </li>
  );
}

export default function AnggotaPage() {
  const [q, setQ] = useState("");
  // Jam live — hydration-safe: render kosong dulu di server.
  const [clock, setClock] = useState(null);

  useEffect(() => {
    const tick = () => setClock(new Date());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const filtered = members.filter((m) =>
    m.nama.toLowerCase().includes(q.trim().toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          <span className="inline-block -rotate-1 rounded-xl border-2 border-ink bg-yellow px-3 py-1 shadow-[3px_3px_0_var(--color-ink)]">
            Anggota Kelas
          </span>
        </h2>
        <p className="mt-3 text-sm opacity-70">
          {members.length} siswa XI-1.3 Elixirs, urut absen
          {clock && (
            <> · sekarang{" "}
              <strong>
                {clock.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
              </strong>
              {slotNow(clock) && slotNow(clock).tipe !== "break"
                ? ` · sedang ${slotNow(clock).mapel}`
                : today(clock)
                  ? " · luar jam pelajaran"
                  : " · hari libur"}
            </>
          )}
        </p>

        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari nama…"
          className="bcard mt-6 w-full max-w-sm bg-white px-4 py-2.5 text-sm font-semibold outline-none"
        />

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((m, i) => (
            <MemberCard key={m.nama} m={m} index={i} />
          ))}
        </ul>

        {!filtered.length && (
          <p className="mt-8 text-sm opacity-60">Tidak ketemu nama “{q}”.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
