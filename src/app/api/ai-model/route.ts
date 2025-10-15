import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

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
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
