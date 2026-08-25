// OG image dinamis: app/elixirs.com/opengraph-image.jsx — pakai next/og ImageResponse.
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "XI-1.3 Elixirs — SMAN 11 Kota Bekasi";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fdf6ec",
          backgroundImage:
            "linear-gradient(rgba(31,26,23,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(31,26,23,0.06) 2px, transparent 2px)",
          backgroundSize: "48px 48px",
          position: "relative",
        }}
      >
        {/* blok warna sudut */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 180, height: 24, background: "#ffc700" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 180, height: 24, background: "#ff5d8f" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 180, height: 24, background: "#4cc9f0" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 180, height: 24, background: "#9b5de5" }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            border: "6px solid #1f1a17",
            borderRadius: 36,
            padding: "40px 72px",
            background: "#ffffff",
            boxShadow: "16px 16px 0 #1f1a17",
            transform: "rotate(-1.5deg)",
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 9999,
              border: "5px solid #1f1a17",
              background: "#9b5de5",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              fontWeight: 800,
            }}
          >
            🧪
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 88, fontWeight: 800, color: "#1f1a17", lineHeight: 1 }}>
              XI-1.3&nbsp;<span style={{ color: "#9b5de5" }}>Elixirs</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 600, color: "#1f1a17", opacity: 0.75, marginTop: 12 }}>
              SMAN 11 Kota Bekasi · 43 siswa satu ramuan
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 44,
            fontSize: 26,
            fontWeight: 700,
            color: "#1f1a17",
            background: "#ffc700",
            border: "4px solid #1f1a17",
            borderRadius: 9999,
            padding: "10px 34px",
            boxShadow: "8px 8px 0 #1f1a17",
          }}
        >
          Satu ramuan, seribu prestasi
        </div>
      </div>
    ),
    size
  );
}
