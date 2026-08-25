const palette = {
  yellow: "bg-yellow",
  pink: "bg-pink",
  blue: "bg-blue",
  lime: "bg-lime",
  purple: "bg-purple text-white",
};

// Heading section dengan badge warna playful.
export default function SectionHeading({ children, color = "yellow", sub }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        <span className={`inline-block -rotate-1 rounded-xl border-2 border-ink px-3 py-1 shadow-[3px_3px_0_var(--color-ink)] ${palette[color]}`}>
          {children}
        </span>
      </h2>
      {sub && <p className="mt-3 text-sm opacity-70">{sub}</p>}
    </div>
  );
}
