import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-display text-6xl font-extrabold">404</p>
      <p className="text-sm opacity-70">Ramuan ini tidak ada di rak manapun.</p>
      <Link href="/" className="bbtn bg-yellow px-5 py-2 text-sm font-bold">
        Balik ke rumah
      </Link>
    </main>
  );
}
