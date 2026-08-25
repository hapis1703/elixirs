import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { schedule } from "@/data/schedule";

const dayColors = ["bg-yellow", "bg-pink text-white", "bg-blue", "bg-lime", "bg-purple text-white"];

function slotClass(s) {
  if (s.tipe === "break") return "border-dashed border-ink/40 bg-transparent opacity-60";
  if (s.tipe === "event") return "bg-ink text-cream";
  return "bg-cream";
}

export default function JadwalPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <SectionHeading color="blue" sub="TP 2026/2027 — mapel sama yang terpotong istirahat ditulis terpisah">
          Jadwal Pelajaran
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {schedule.map((d, di) => (
            <section key={d.hari} className="bcard overflow-hidden bg-white">
              <h3
                className={`font-display text-xl font-extrabold border-b-2 border-ink px-4 py-2 ${dayColors[di % dayColors.length]}`}
              >
                {d.hari}
              </h3>
              <ul>
                {d.slots.map((s, i) => (
                  <li
                    key={i}
                    className={`flex items-baseline justify-between gap-3 border-b border-ink/10 px-4 py-2.5 last:border-0 ${slotClass(s)}`}
                  >
                    <span className="text-sm font-semibold">{s.mapel}</span>
                    <span className="shrink-0 font-mono text-xs opacity-70">
                      {s.jam ? `jam ${s.jam} · ` : ""}
                      {s.mulai}–{s.selesai}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
