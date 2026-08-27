"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

export default function MenfessPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pesan, setPesan] = useState("");
  const [songQuery, setSongQuery] = useState("");
  const [songResults, setSongResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [searching, setSearching] = useState(false);
  const [status, setStatus] = useState("");

  async function searchSong() {
    if (!songQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(`/api/deezer?q=${encodeURIComponent(songQuery)}`);
      const data = await res.json();
      setSongResults(data.data || []);
    } catch {
      setSongResults([]);
    } finally {
      setSearching(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/shoutbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          pesan,
          song: selectedSong
            ? {
                title: selectedSong.title,
                artist: selectedSong.artist.name,
                preview: selectedSong.preview,
                cover: selectedSong.album.cover_small,
                link: selectedSong.link,
              }
            : songQuery.trim()
              ? { title: songQuery.trim(), artist: "", preview: null, cover: null, link: null }
              : null,
        }),
      });
      if (res.ok) {
        setFrom("");
        setTo("");
        setPesan("");
        setSongQuery("");
        setSongResults([]);
        setSelectedSong(null);
        setStatus("ok");
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <SectionHeading color="pink" sub="Kirim pesan rahasia buat warga kelas">Menfess</SectionHeading>

        <form onSubmit={handleSubmit} className="bcard mt-8 space-y-4 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider opacity-70">From</label>
              <input
                required
                maxLength={50}
                placeholder="Nama kamu"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-lg border-2 border-ink bg-cream px-3 py-2 text-sm font-semibold outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider opacity-70">To</label>
              <input
                required
                maxLength={50}
                placeholder="Nama penerima / kelas"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full rounded-lg border-2 border-ink bg-cream px-3 py-2 text-sm font-semibold outline-none focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider opacity-70">Message</label>
            <textarea
              required
              maxLength={300}
              rows={3}
              placeholder="Tulis pesan..."
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              className="w-full resize-none rounded-lg border-2 border-ink bg-cream px-3 py-2 text-sm font-semibold outline-none focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider opacity-70">Song (opsional)</label>
            <div className="flex gap-2">
              <input
                maxLength={100}
                placeholder="Cari lagu atau ketik manual (Judul - Artis)"
                value={songQuery}
                onChange={(e) => { setSongQuery(e.target.value); setSelectedSong(null); }}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), searchSong())}
                className="flex-1 rounded-lg border-2 border-ink bg-cream px-3 py-2 text-sm font-semibold outline-none focus:bg-white"
              />
              <button
                type="button"
                onClick={searchSong}
                disabled={searching}
                className="bbtn bg-yellow px-4 py-2 text-xs font-bold disabled:opacity-50"
              >
                {searching ? "..." : "Cari"}
              </button>
            </div>

            {songResults.length > 0 && (
              <ul className="mt-2 space-y-1">
                {songResults.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => { setSelectedSong(t); setSongResults([]); }}
                      className="flex w-full items-center gap-2 rounded border border-ink/20 bg-cream p-2 text-left text-xs hover:bg-yellow/30"
                    >
                      <img src={t.album.cover_small} alt="" className="h-8 w-8 rounded" />
                      <span className="font-semibold">{t.title} — {t.artist.name}</span>
                      {t.preview && <audio controls preload="none" className="ml-auto h-6 w-20"><source src={t.preview} type="audio/mpeg" /></audio>}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {selectedSong && (
              <div className="mt-2 flex items-center gap-2 rounded border-2 border-purple/30 bg-purple/5 p-2 text-xs">
                <img src={selectedSong.album.cover_small} alt="" className="h-8 w-8 rounded" />
                <span className="font-semibold">Dipilih: {selectedSong.title} — {selectedSong.artist.name}</span>
                <button type="button" onClick={() => setSelectedSong(null)} className="ml-auto text-red-500 underline">Hapus</button>
              </div>
            )}
          </div>

          <button type="submit" disabled={status === "sending"} className="bbtn w-full bg-purple px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">
            {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
          </button>
          {status === "ok" && <p className="text-center text-xs font-bold text-green-600">Pesan terkirim! Hanya admin yang bisa melihat.</p>}
          {status === "error" && <p className="text-center text-xs font-bold text-red-500">Gagal mengirim. Coba lagi.</p>}
        </form>
      </main>
      <Footer />
    </>
  );
}