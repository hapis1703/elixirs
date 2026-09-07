import { NextResponse } from "next/server";
import { getSchedule } from "@/lib/sheets";

export const revalidate = 60;

export async function GET() {
  try {
    const schedule = await getSchedule();
    return NextResponse.json(schedule);
  } catch (e) {
    console.error("API /api/schedule error:", e.message);
    return NextResponse.json([], { status: 500 });
  }
}
