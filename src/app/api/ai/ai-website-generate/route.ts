import { decrementCredits } from "@/lib/queries";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, userId, model } = await req.json();

  console.log(userId);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model || "x-ai/grok-4.1-fast",

      messages,
      stream: true,
    }),
  });

  console.log("response", response);

  if (!response.ok) {
    return NextResponse.json({ error: "OpenRouter API error" }, { status: response.status });
  }

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

          // Split by newline to handle line-by-line streaming
          const lines = buffer.split("\n");
          buffer = lines.pop() || ""; // Keep incomplete line in buffer

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("data: ")) {
              const data = trimmed.slice(6).trim();

              // OpenRouter sends [DONE] when stream ends
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(new TextEncoder().encode(content));
                }
              } catch (e) {
                console.error("Failed to parse SSE data:", data);
              }
            }
          }
        }

        // Process any remaining content in the buffer
        if (buffer.trim()) {
          const trimmed = buffer.trim();
          if (trimmed.startsWith("data: ")) {
            const data = trimmed.slice(6).trim();
            if (data !== "[DONE]") {
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(new TextEncoder().encode(content));
                }
              } catch (e) {
                console.error("Failed to parse remaining SSE data:", data);
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

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
