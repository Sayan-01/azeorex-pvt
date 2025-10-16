import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, userId } = await req.json();

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

    await db.user.update({
      where: { id: userId },
      data: { credits: { decrement: 100 } },
    });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "Azeorex", // optional
      },
      body: JSON.stringify({
        // model: "google/gemini-2.0-flash-exp:free",
        model: "openai/gpt-4o:free",
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter Error:", data);
      return NextResponse.json({ error: data?.error?.message || "AI model failed" }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
