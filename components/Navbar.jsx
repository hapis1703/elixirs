"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/anggota", label: "Anggota" },
  { href: "/struktur", label: "Struktur" },
  { href: "/jadwal", label: "Jadwal" },
  { href: "/galeri", label: "Galeri" },
  { href: "/prestasi", label: "Prestasi" },
  { href: "/pengumuman", label: "Pengumuman" },
  { href: "/shoutbox", label: "Menfess" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-cream/95 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="relative z-50 font-display text-lg font-extrabold tracking-tight"
          onClick={() => setOpen(false)}
        >
          XI-1.3 <span className="text-purple">Elixirs</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`rounded-full border-2 px-3 py-1 text-sm font-semibold transition-colors ${
                      active
                        ? "border-ink bg-yellow shadow-[2px_2px_0_var(--color-ink)]"
                        : "border-transparent hover:border-ink"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* hamburger */}
          <button
            type="button"
            className="bbtn relative z-50 bg-pink px-3 py-1 font-bold text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Buka menu navigasi"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* mobile */}
      <div
        className={`relative z-50 overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <ul className="grid grid-cols-2 gap-2 border-t-2 border-ink bg-cream p-4">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl border-2 border-ink px-3 py-2.5 text-center text-sm font-semibold ${
                    active ? "bg-yellow shadow-[2px_2px_0_var(--color-ink)]" : "bg-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* overlay nutup konten pas menu kebuka, klik buat tutup */}
      {open && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 cursor-default bg-ink/30 md:hidden"
        />
      )}
    </header>
  );
}
