import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

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

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "Azeorex", // optional
      },
      body: JSON.stringify({
        model: "tngtech/deepseek-r1t2-chimera:free",
        // model: "openai/gpt-oss-20b:free",
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.message || "API request failed" }, { status: response.status });
    }

    if (!response.body) {
      return NextResponse.json({ error: "No response stream from model" }, { status: 500 });
    }

    // Transform the OpenRouter stream to extract content
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const readable = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") {
                  reader.releaseLock();
                  controller.close();
                  return;
                }
                try {
                  const parsed = JSON.parse(data);
                  const text = parsed.choices?.[0]?.delta?.content;
                  if (text) {
                    controller.enqueue(encoder.encode(text));
                  }
                } catch (err) {
                  // Skip invalid JSON
                }
              }
            }
          }
          controller.close();
        } catch (err) {
          console.error("Stream error", err);
          controller.error(err);
        }
      },
    });

    await db.user.update({
      where: { id: userId },
      data: { credits: { decrement: 100 } },
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
