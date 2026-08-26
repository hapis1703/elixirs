import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LoadingCauldron from "@/components/LoadingCauldron";
import PotionProgress from "@/components/PotionProgress";
import BubbleTrail from "@/components/BubbleTrail";
import BirthdayBanner from "@/components/BirthdayBanner";

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

// Registrasi service worker (PWA offline).
const swRegister = `if("serviceWorker" in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("/sw.js").catch(function(){})})}`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9b5de5" />
        <script dangerouslySetInnerHTML={{ __html: swRegister }} />
      </head>
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <LoadingCauldron />
        <PotionProgress />
        <BubbleTrail />
        <BirthdayBanner />
        {children}
      </body>
    </html>
  );
}
