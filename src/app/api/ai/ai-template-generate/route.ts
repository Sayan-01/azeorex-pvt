import { NextResponse } from "next/server";
import { geminiModel } from "../../../../../Ai/AiModel";
import { db } from "@/lib/db";
import { auth } from "../../../../../auth";

export const POST = async (req: any) => {
  const { prompt } = await req.json();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.credits < 100) {
      return NextResponse.json({ error: "Not enough credits" }, { status: 400 });
    }
    
    const result = await geminiModel.sendMessage(prompt);
    const aiRes = result.response.text();

    await db.user.update({
      where: { id: userId },
      data: { credits: { decrement: 60 } },
    });

    return NextResponse.json(aiRes);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};
