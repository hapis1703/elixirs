import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TodaySchedule from "@/components/TodaySchedule";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { Star, ScribbleArrow, Bubbles, PotionBottle } from "@/components/Doodles";
import { kelas, members } from "@/data/members";
import { pengumuman } from "@/data/content";
import { galeri } from "@/data/galeri";

const marqueeItems = [
  "XI-1.3 ELIXIRS",
  "SMAN 11 KOTA BEKASI",
  "SATU RAMUAN, SERIBU PRESTASI",
  "43 ORANG SATU KELAS",
];

function Marquee({ reverse = false }) {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div
      className={`marquee border-y-2 border-ink py-2 font-display text-sm font-bold tracking-widest ${
        reverse ? "bg-pink text-white" : "bg-yellow"
      }`}
    >
      <div className="marquee-track" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {row.concat(row).map((t, i) => (
          <span key={i} className="mx-6">
            {t} ✦
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const pinned = pengumuman.filter((p) => p.pinned).slice(0, 2);
  const latest = [...pengumuman]
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal))
    .slice(0, 3);
  const fotoPreview = galeri.slice(0, 4);

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative mx-auto max-w-5xl px-4 pb-10 pt-14 text-center sm:pt-20">
          <Star className="floaty absolute left-[6%] top-16 hidden sm:block" style={{ "--rot": "-12deg" }} />
          <Bubbles className="floaty absolute right-[5%] top-24 hidden sm:block" style={{ "--rot": "8deg", animationDelay: "1.2s" }} />
          <ScribbleArrow className="absolute bottom-2 left-[12%] hidden rotate-[160deg] md:block" size={54} />

          <span className="inline-block -rotate-2 rounded-full border-2 border-ink bg-blue px-4 py-1 text-xs font-bold shadow-[3px_3px_0_var(--color-ink)]">
            ✦ {kelas.sekolah.toUpperCase()} ✦
          </span>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-none tracking-tight sm:text-7xl">
            XI-1.3
            <br />
            <span className="inline-block rotate-1 text-purple">{kelas.sebutan}</span>
          </h1>

          <Reveal delay={150}>
            <div className="mt-6 flex justify-center">
              <PotionBottle size={170} className="drop-shadow-[6px_6px_0_rgba(31,26,23,1)] sm:size-[210px]" />
            </div>
          </Reveal>

          <p className="mx-auto mt-5 max-w-md text-sm opacity-70 sm:text-base">
            “{kelas.motto}” — {members.length} siswa, satu kelas, tak terhingga energinya.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/anggota" className="bbtn bg-yellow px-5 py-2.5 text-sm font-bold">
              Kenalan sama kami
            </Link>
            <Link href="/jadwal" className="bbtn bg-white px-5 py-2.5 text-sm font-bold">
              Lihat jadwal
            </Link>
          </div>
        </section>

        <Marquee />

        {/* JADWAL HARI INI + PENGUMUMAN */}
        <section className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-[3fr_2fr]">
          <Reveal>
            <SectionHeading color="pink">Hari Ini</SectionHeading>
            <TodaySchedule />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading color="lime">Pengumuman</SectionHeading>
            <ul className="space-y-3">
              {(pinned.length ? pinned : latest).map((p) => (
                <li key={p.id} className="bcard bg-white p-4">
                  <p className="text-xs font-semibold opacity-60">
                    {p.tanggal} {p.pinned && "· 📌 pinned"}
                  </p>
                  <p className="font-display font-bold">{p.judul}</p>
                  <p className="mt-1 line-clamp-2 text-sm opacity-70">{p.isi}</p>
                </li>
              ))}
              {!pengumuman.length && (
                <li className="bcard bg-white p-4 text-sm opacity-60">
                  Belum ada pengumuman.
                </li>
              )}
            </ul>
            <Link href="/pengumuman" className="mt-3 inline-block text-sm font-bold underline">
              Semua pengumuman →
            </Link>
          </Reveal>
        </section>

        {/* GALERI PREVIEW */}
        {fotoPreview.length > 0 && (
          <section className="border-y-2 border-ink bg-white/60 py-12">
            <div className="mx-auto max-w-5xl px-4">
              <Reveal>
                <SectionHeading color="blue" sub="Intip momen kami">
                  Dari Galeri
                </SectionHeading>
              </Reveal>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {fotoPreview.map((g, i) => (
                  <Reveal key={g.src} delay={i * 80}>
                    <Link href="/galeri" className="bcard block overflow-hidden bg-white">
                      <Image
                        src={g.src}
                        alt={g.judul}
                        width={g.w}
                        height={g.h}
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="h-36 w-full object-cover sm:h-44"
                      />
                      <p className="truncate px-3 py-2 text-xs font-bold">{g.judul}</p>
                    </Link>
                  </Reveal>
                ))}
              </div>
              <Link href="/galeri" className="bbtn mt-6 inline-block bg-lime px-5 py-2 text-sm font-bold">
                Buka galeri 📸
              </Link>
            </div>
          </section>
        )}

        <Marquee reverse />

        {/* QUICK LINKS */}
        <section className="relative mx-auto max-w-5xl px-4 py-12">
          <Bubbles className="floaty absolute right-[2%] top-6 hidden opacity-80 lg:block" size={56} style={{ animationDelay: "0.6s" }} />
          <Reveal>
            <SectionHeading color="purple" sub="Jelajahi website kelas">
              Ada apa aja di sini?
            </SectionHeading>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { href: "/anggota", label: "Anggota", desc: `${members.length} siswa`, bg: "bg-yellow", emoji: "🧑‍🎓" },
              { href: "/struktur", label: "Struktur", desc: "Organigram kelas", bg: "bg-pink text-white", emoji: "🏛️" },
              { href: "/galeri", label: "Galeri", desc: "Momen kelas", bg: "bg-blue", emoji: "📸" },
              { href: "/prestasi", label: "Prestasi", desc: "Kebanggaan kelas", bg: "bg-lime", emoji: "🏆" },
            ].map((c, i) => (
              <Reveal key={c.href} delay={i * 90}>
                <Link href={c.href} className={`bcard block p-5 ${c.bg}`}>
                  <span className="text-3xl" aria-hidden>{c.emoji}</span>
                  <p className="mt-2 font-display text-lg font-extrabold">{c.label}</p>
                  <p className="text-xs opacity-80">{c.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
