import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { pengumuman } from "@/data/content";

const fmt = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function PengumumanPage() {
  const sorted = [...pengumuman].sort((a, b) => {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
    return b.tanggal.localeCompare(a.tanggal);
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <SectionHeading color="pink" sub="Info penting seputar kelas">
          Pengumuman
        </SectionHeading>

        {sorted.length ? (
          <ul className="space-y-4">
            {sorted.map((p) => (
              <li key={p.id} className={`bcard p-5 ${p.pinned ? "bg-yellow" : "bg-white"}`}>
                <p className="text-xs font-semibold opacity-70">
                  {fmt(p.tanggal)}
                  {p.pinned && (
                    <span className="ml-2 rounded-full border border-ink bg-white px-2 py-0.5 text-[10px] font-bold text-ink">
                      📌 PINNED
                    </span>
                  )}
                </p>
                <h3 className="mt-1 font-display text-xl font-extrabold">{p.judul}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{p.isi}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="bcard bg-white p-5 text-sm opacity-60">Belum ada pengumuman.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
