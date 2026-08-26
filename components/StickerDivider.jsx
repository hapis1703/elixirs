// Divider antar section: garis putus-putus + sticker kecil di tengah.
// Server-safe. Pemakaian: <StickerDivider label="Galeri" color="bg-pink" />
export default function StickerDivider({ label, color = "bg-yellow" }) {
  return (
    <div className="mx-auto my-12 flex max-w-5xl items-center gap-4 px-4" aria-hidden>
      <span className="h-0.5 flex-1 border-t-3 border-dashed border-ink opacity-40" />
      <span
        className={`inline-block -rotate-2 rounded-lg border-2 border-ink px-3 py-1 font-display text-xs font-extrabold uppercase tracking-widest shadow-[2px_2px_0_var(--color-ink)] ${color}`}
      >
        {label}
      </span>
      <span className="h-0.5 flex-1 border-t-3 border-dashed border-ink opacity-40" />
    </div>
  );
}
