import Link from "next/link";
import { kelas } from "@/data/members";

export default function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-ink bg-ink text-cream">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-10 text-center">
        <p className="font-display text-2xl font-extrabold">
          XI-1.3 <span className="text-lime">{kelas.sebutan}</span>
        </p>
        <p className="text-sm opacity-80">
          {kelas.sekolah} · Wali Kelas: {kelas.waliKelas}
        </p>
        <a
          href={kelas.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="bbtn bg-pink px-5 py-2 text-sm font-bold text-white"
        >
          @elixxirss di Instagram
        </a>
        <p className="mt-4 text-xs opacity-60">
          © {new Date().getFullYear()} {kelas.nama} {kelas.sebutan} · made with 💜 oleh kelas
        </p>
      </div>
    </footer>
  );
}
