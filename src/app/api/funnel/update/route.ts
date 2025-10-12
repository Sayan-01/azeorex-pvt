import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { funnelPageId, content } = await req.json();

    const updatedPage = await db.funnelPage.update({
      where: { id: funnelPageId },
      data: { content },
    });

    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("Update Funnel Error:", error);
    return NextResponse.json({ error: "Failed to update funnel page" }, { status: 500 });
  }
}
