"use client";

import { members as localMembers } from "@/data/members";

// Filter anggota yang ulang tahun bulan ini atau hari ini.
export default function BirthdayCounter({ members = localMembers }) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentDay = now.getDate();

  const birthdays = members.filter((m) => {
    if (!m.lahir) return false;
    const [mm, dd] = m.lahir.split("-").map(Number);
    return mm === currentMonth && dd === currentDay;
  });

  if (birthdays.length === 0) return null;

  return (
    <div className="bcard bg-yellow p-5">
      <p className="font-display text-lg font-bold">🎂 Ulang Tahun Hari Ini!</p>
      <ul className="mt-2 space-y-1">
        {birthdays.map((m, i) => (
          <li key={i} className="text-sm font-semibold">
            {m.nama} {m.panggilan ? `(${m.panggilan})` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}