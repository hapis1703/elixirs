import { NextResponse } from "next/server";

const WEBHOOK = process.env.DISCORD_MENFESS_WEBHOOK;

export async function POST(req) {
  const body = await req.json();
  const from = (body.from || "").trim().slice(0, 50);
  const to = (body.to || "").trim().slice(0, 50);
  const pesan = (body.pesan || "").trim().slice(0, 300);
  const song = body.song || null;

  if (!from || !pesan) {
    return NextResponse.json({ error: "From & Message wajib diisi" }, { status: 400 });
  }

  if (!WEBHOOK) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  // Build Discord embed
  let description = `**To:** ${to || "-"}
${pesan}`;
  if (song?.title) {
    description += `

🎵 **${song.title}** — ${song.artist || ""}`;
    if (song.link) description += `
[Listen](${song.link})`;
  }

  const embed = {
    title: "💌 Menfess Baru",
    description,
    color: 0xe91e63,
    footer: { text: `From: ${from}` },
    timestamp: new Date().toISOString(),
  };

  if (song?.cover) embed.thumbnail = { url: song.cover };

  try {
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Discord webhook failed:", res.status, errText);
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Discord webhook error:", e);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
