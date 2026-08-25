import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { TrophyDoodle } from "@/components/Doodles";
import { prestasi } from "@/data/content";

export default function PrestasiPage() {
  const sorted = [...prestasi].sort((a, b) => b.tanggal.localeCompare(a.tanggal));

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <SectionHeading color="lime" sub="Kebanggaan XI-1.3 Elixirs">
          Prestasi
        </SectionHeading>

        {sorted.length ? (
          <ol className="relative space-y-6 border-l-4 border-ink pl-6">
            {sorted.map((p, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[35px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-ink bg-yellow text-xs"
                  aria-hidden
                >
                  🏆
                </span>
                <div className="bcard bg-white p-5">
                  <p className="text-xs font-semibold opacity-60">{p.tanggal}</p>
                  <h3 className="font-display text-lg font-extrabold">{p.judul}</h3>
                  <p className="mt-1 text-sm opacity-80">{p.deskripsi}</p>
                  {p.pemenang && (
                    <p className="mt-2 inline-block rounded-full border border-ink bg-lime px-3 py-0.5 text-xs font-bold">
                      {p.pemenang}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="bcard bg-white p-5 text-sm opacity-60">Belum ada prestasi yang dicatat.</p>
        )}
        {!sorted.length && (
          <div className="mt-6 flex flex-col items-center gap-2 text-center">
            <TrophyDoodle />
            <p className="text-sm opacity-70">Rak trofi masih menunggu — segera datang. 🚀</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
