// api/ai-website-generate/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge";
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, userId } = await req.json();

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tngtech/deepseek-r1t2-chimera:free",
      messages,
      stream: true,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "OpenRouter API error" }, { status: response.status });
  }

  // ✅ Parse SSE stream and extract content deltas
  const readableStream = new ReadableStream({
    async start(controller) {
      const decoder = new TextDecoder();
      const reader = response.body?.getReader();

      if (!reader) {
        controller.close();
        return;
      }

      try {
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Decode chunk and add to buffer
          buffer += decoder.decode(value, { stream: true });

          // Split by double newlines (SSE format)
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || ""; // Keep incomplete line in buffer

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();

              // OpenRouter sends [DONE] when stream ends
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;

                // ✅ Send only the content text, not the full JSON
                if (content) {
                  controller.enqueue(new TextEncoder().encode(content));

                }
              } catch (e) {
                console.error("Failed to parse SSE data:", data);
              }
            }
          }
        }

        controller.close();
      } catch (error) {
        console.error("Stream error:", error);
        controller.error(error);
      }
    },
  });

  // await db.user.update({
  //   where: { id: userId },
  //   data: { credits: { decrement: 100 } },
  // });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
