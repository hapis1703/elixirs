import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { struktur } from "@/data/struktur";

const palette = {
  yellow: "bg-yellow",
  pink: "bg-pink text-white",
  blue: "bg-blue",
  lime: "bg-lime",
  purple: "bg-purple text-white",
};

function Card({ item, wide = false }) {
  return (
    <div className={`bcard p-5 ${palette[item.warna]} ${wide ? "" : ""}`}>
      <p className="text-xs font-bold uppercase tracking-wider opacity-80">{item.jabatan}</p>
      <ul className="mt-2 space-y-1">
        {item.anggota.map((a) => (
          <li key={a} className="font-display text-lg font-extrabold leading-tight">
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StrukturPage() {
  const byLevel = (l) => struktur.filter((s) => s.level === l);
  const [wali] = byLevel(0);
  const [ketua] = byLevel(1).filter((s) => s.jabatan.startsWith("Ketua"));
  const [wakil] = byLevel(1).filter((s) => s.jabatan.startsWith("Wakil"));
  const bendahara = byLevel(2).filter((s) => s.jabatan.startsWith("Bendahara"));
  const sekretaris = byLevel(2).filter((s) => s.jabatan.startsWith("Sekretaris"));
  const seksi = byLevel(3);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <SectionHeading color="purple" sub={`Wali kelas: ${wali.anggota[0]}`}>
          Struktur Kelas
        </SectionHeading>

        {/* Level 0: wali kelas */}
        <div className="mx-auto max-w-sm">
          <Card item={wali} />
        </div>

        <div className="text-center font-display text-2xl" aria-hidden>↓</div>

        {/* Level 1: ketua + wakil */}
        <div className="mx-auto grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
          <Card item={ketua} />
          <Card item={wakil} />
        </div>

        <div className="text-center font-display text-2xl" aria-hidden>↓</div>

        {/* Level 2: bendahara + sekretaris */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[...bendahara, ...sekretaris].map((s) => (
            <Card key={s.jabatan} item={s} />
          ))}
        </div>

        <div className="text-center font-display text-2xl" aria-hidden>↓</div>

        {/* Level 3: seksi */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {seksi.map((s) => (
            <Card key={s.jabatan} item={s} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
