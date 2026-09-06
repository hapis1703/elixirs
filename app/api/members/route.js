import { NextResponse } from "next/server";
import { getMembers } from "@/lib/sheets";

export const revalidate = 60;

export async function GET() {
  try {
    const members = await getMembers();
    return NextResponse.json(members);
  } catch (e) {
    console.error("API /api/members error:", e.message);
    return NextResponse.json([], { status: 500 });
  }
}
