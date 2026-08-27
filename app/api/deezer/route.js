import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q");
  if (!q) return NextResponse.json({ data: [] });

  try {
    const res = await fetch(
      `https://api.deezer.com/search/track?q=${encodeURIComponent(q)}&limit=5`
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
