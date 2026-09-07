import { NextResponse } from "next/server";
import { getSchedule } from "@/lib/sheets";

export const revalidate = 60;

export async function GET() {
  try {
    const schedule = await getSchedule();
    // ponytail: force no-cache to prevent browser holding stale API data longer than ISR window
    return NextResponse.json(schedule, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (e) {
    console.error("API /api/schedule error:", e.message);
    return NextResponse.json([], { status: 500 });
  }
}
