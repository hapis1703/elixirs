import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ShimmerImage from "@/components/ShimmerImage";
import { CameraDoodle } from "@/components/Doodles";
import { galeri } from "@/data/galeri";
import { kelas } from "@/data/members";

const fmt = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

export default function GaleriPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <SectionHeading color="yellow" sub="Momen-momen XI-1.3 Elixirs">
          Galeri
        </SectionHeading>

        {galeri.length ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galeri.map((g) => (
              <figure key={g.src} className="bcard mb-4 break-inside-avoid overflow-hidden bg-white">
                <ShimmerImage src={g.src} alt={g.judul} width={g.w} height={g.h} />
                <figcaption className="border-t-2 border-ink px-4 py-3">
                  <p className="font-display text-sm font-extrabold">{g.judul}</p>
                  <p className="text-xs opacity-60">{fmt(g.tanggal)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="bcard flex flex-col items-center gap-3 bg-blue p-10 text-center">
            <CameraDoodle />
            <p className="font-display text-xl font-extrabold">Foto menyusul</p>
            <p className="max-w-sm text-sm opacity-80">
              Galeri masih kosong. Lihat dokumentasi kelas di Instagram dulu ya.
            </p>
            <a
              href={kelas.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bbtn bg-pink px-4 py-2 text-sm font-bold text-white"
            >
              @elixxirss
            </a>
          </div>
        )}
      </main>


      <Footer />
    </>
  );
}
