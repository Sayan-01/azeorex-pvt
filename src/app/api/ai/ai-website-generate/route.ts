import { NextResponse } from "next/server";
import { buildSystemPrompt, buildUserPrompt, validateElementMap } from "./prompt-helpers";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) throw new Error("Missing OPENROUTER_API_KEY environment variable");

const MAX_RETRIES = 2;

export async function POST(req: Request) {
  try {
    const { prompt, selectedSections, model: modelName } = await req.json();

    if (!prompt || !selectedSections?.length) {
      return NextResponse.json({ error: "prompt and selectedSections are required" }, { status: 400 });
    }

    const model = modelName || "google/gemini-2.5-flash";

    let lastError: string | undefined;
    let elements: any = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const userPrompt = buildUserPrompt(prompt, selectedSections, lastError);

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          "X-Title": "Azeorex Website Builder",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: buildSystemPrompt() },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
          temperature: 1,
          max_tokens: 65536,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        lastError = `OpenRouter API error (${response.status}): ${errText}`;
        console.error(`[ai-website-generate] Attempt ${attempt + 1} failed:`, lastError);
        continue;
      }

      const data = await response.json();
      const rawText = data?.choices?.[0]?.message?.content?.trim();

      if (!rawText) {
        lastError = `Empty response from model on attempt ${attempt + 1}`;
        continue;
      }

      let parsed: any;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        lastError = `Invalid JSON from model on attempt ${attempt + 1}`;
        continue;
      }

      const { valid, errors } = validateElementMap(parsed);
      if (!valid) {
        lastError = errors.join("; ");
        console.warn(`[ai-website-generate] Validation failed attempt ${attempt + 1}:`, lastError);
        continue;
      }

      elements = parsed;
      break;
    }

    if (!elements) {
      return NextResponse.json(
        { error: `Failed to generate valid elements after ${MAX_RETRIES + 1} attempts. Last error: ${lastError}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, elements });
  } catch (error: any) {
    console.error("[ai-website-generate] Unhandled error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
