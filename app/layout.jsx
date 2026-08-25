import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "XI-1.3 Elixirs — SMAN 11 Kota Bekasi",
  description:
    "Website resmi kelas XI-1.3 Elixirs, SMAN 11 Kota Bekasi. Jadwal pelajaran, anggota kelas, struktur, galeri momen, dan pengumuman.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
