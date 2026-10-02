import { PromptForWebPage } from "../../../../../Ai/prompt-v2";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { prompt, selectedSections, model } = await req.json();

  const systemPrompt = PromptForWebPage({ userInput: prompt });
  const userMessage = `Sections to generate: ${selectedSections?.join(", ") ?? "all"}.\n\nUser request: ${prompt}`;

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "Azeorex Website Builder",
    },
    body: JSON.stringify({
      model: model || "google/gemini-2.0-flash-exp:free",
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 12000,
    }),
  });

  if (!upstream.ok) {
    const err = await upstream.text();
    return new Response(JSON.stringify({ error: err }), {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Pipe OpenRouter SSE stream straight to the client
  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
