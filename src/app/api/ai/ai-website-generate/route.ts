import { NextResponse } from "next/server";
import dedent from "dedent";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";
export const maxDuration = 60;

export type SectionType =
  | "nav"
  | "hero"
  | "features"
  | "testimonials"
  | "pricing"
  | "cta-banner"
  | "footer";

const CANONICAL_ORDER: SectionType[] = [
  "nav",
  "hero",
  "features",
  "testimonials",
  "pricing",
  "cta-banner",
  "footer",
];

const SECTION_PURPOSE: Record<SectionType, string> = {
  nav: "Sticky top nav: logo + links + a gradient CTA button, subtle bottom border.",
  hero: "Full-width hero: gradient-text h1, subtitle p, primary + secondary CTA buttons.",
  features: "Section with a 'grid md:grid-cols-3 gap-8' container of 3+ cards (icon + h3 + p).",
  testimonials: "2-3 quote cards: quote p + name h3 + role p.",
  pricing: "3 tier cards, middle tier visually emphasized with a gradient border.",
  "cta-banner": "Full-width gradient section with h2 + button.",
  footer: "Dark section: logo + link columns + copyright p.",
};

const SECTION_DESIGN_QUALITY_PROMPT = dedent`
  You are a world-class UI/UX designer and JSON developer.
  Generate a visually stunning, modern, and high-converting webpage section as a flat JSON fragment.

  DESIGN QUALITY RULES:
  1. Typography:
     - h1 hero: fontSize "56px" to "72px", fontWeight "800", lineHeight "1.1", letterSpacing "-0.02em"
     - h2: fontSize "36px" to "48px", fontWeight "700"
     - h3: fontSize "24px" to "32px", fontWeight "600"
     - p body/subtitle: fontSize "16px" to "18px", lineHeight "1.7", color "#94a3b8" (for dark surfaces) or "#64748b" (for light surfaces)
     - labels: fontSize "12px", fontWeight "600", letterSpacing "0.08em", textTransform "uppercase"
  2. Spacing:
     - Sections: paddingTop/Bottom "100px" to "120px", paddingLeft/Right "40px" to "80px"
     - Cards/Containers: padding "40px" to "48px"
     - Center contents inside section using a container element with maxWidth "1200px", marginLeft "auto", marginRight "auto"
  3. Visual Polish:
     - Cards: borderRadius "16px" to "24px", border "1px solid rgba(255,255,255,0.08)" or "1px solid rgba(0,0,0,0.08)", boxShadow "0 4px 32px rgba(0,0,0,0.2)"
     - Buttons: borderRadius "10px", padding "14px 36px", fontWeight "600", transition "all 0.3s ease", cursor "pointer"
     - Gradients: backgroundImage "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
  4. Images:
     - Always include borderRadius in styles, objectFit "cover"
     - Use unique picsum seeds per image, e.g., "https://picsum.photos/seed/hero/1200/600", "https://picsum.photos/seed/feature1/800/600", etc.
  5. Code Integration:
     - Do NOT use Tailwind for colors, spacing, typography — use styles for those.
     - Use className ONLY for Tailwind features like grid columns: "grid md:grid-cols-3 gap-8", hover/transition states like "hover:opacity-90 transition-all".
`;

export const generateStyleContextTool = {
  name: "generate_style_context",
  description: "Read the user's prompt and lock a specific hex color palette for the page. No sections, no elements — palette only.",
  input_schema: {
    type: "object",
    properties: {
      palette: {
        type: "object",
        properties: {
          background: { type: "string" },
          surface: { type: "string" },
          primary: { type: "string" },
          secondary: { type: "string" },
          textPrimary: { type: "string" },
          textSecondary: { type: "string" },
        },
        required: ["background", "primary", "textPrimary", "textSecondary"],
      },
    },
    required: ["palette"],
  },
} as const;

export const generateWebpageTool = {
  name: "generate_webpage_elements",
  description:
    "Generate a flat ElementMap fragment for ONE section. The section root's " +
    "parentId must be the literal string '__body'.",
  input_schema: {
    type: "object",
    properties: {
      elements: {
        type: "object",
        description: "A flat map of element IDs to element objects.",
        additionalProperties: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            type: { type: "string", enum: ["__body", "section", "container", "column", "text", "h1", "h2", "h3", "h4", "h5", "h6", "image", "button", "link", "video", "form", "input", "textarea", "checkbox", "select"] },
            parentId: { type: ["string", "null"] },
            children: { type: "array", items: { type: "string" } },
            content: { type: "string" },
            styles: { type: "object", additionalProperties: { type: "string" } },
            attributes: { type: "object", additionalProperties: { type: "string" } },
          },
          required: ["id", "type", "parentId", "children", "styles"],
        },
      },
    },
    required: ["elements"],
  },
} as const;

interface Palette {
  background: string;
  surface?: string;
  primary: string;
  secondary?: string;
  textPrimary: string;
  textSecondary: string;
}

// ── Helper: JSON String Extraction ──────────────────────────────────────────
function extractJson(str: string): any {
  const firstBrace = str.indexOf("{");
  const lastBrace = str.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const candidate = str.slice(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate);
    } catch (e) {
      // ignore
    }
  }
  return JSON.parse(str);
}

// ── Direct Gemini API Driver fallback ────────────────────────────────────────
async function callGeminiDirect({
  system,
  user,
  tool,
}: {
  system: string;
  user: string;
  tool: {
    name: string;
    description: string;
    input_schema: Record<string, any>;
  };
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelWithSystem = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: system,
  });

  const result = await modelWithSystem.generateContent({
    contents: [{ role: "user", parts: [{ text: user }] }],
    tools: [{
      functionDeclarations: [{
        name: tool.name,
        description: tool.description,
        parameters: tool.input_schema as any,
      }],
    }],
    toolConfig: {
      functionCallingConfig: {
        mode: "ANY" as any,
        allowedFunctionNames: [tool.name],
      },
    },
  });

  const response = result.response;
  const functionCalls = response.functionCalls();
  if (functionCalls && functionCalls.length > 0) {
    return functionCalls[0].args;
  }

  const text = response.text();
  if (text) {
    return extractJson(text);
  }

  throw new Error("No response or function call returned from Gemini");
}

// ── OpenRouter Model Call helper (with rate-limit fallback) ─────────────────
async function callModel({
  system,
  user,
  tool,
  model,
}: {
  system: string;
  user: string;
  tool: {
    name: string;
    description: string;
    input_schema: Record<string, any>;
  };
  model: string;
}) {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;
  if (!openRouterApiKey) {
    if (process.env.GEMINI_API_KEY) {
      return callGeminiDirect({ system, user, tool });
    }
    throw new Error("Missing OPENROUTER_API_KEY");
  }

  const formattedTool = {
    type: "function",
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.input_schema,
    },
  };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
        "X-Title": "Azeorex Page Generator",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        tools: [formattedTool],
        tool_choice: {
          type: "function",
          function: { name: tool.name },
        },
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      if (response.status === 429 && process.env.GEMINI_API_KEY) {
        console.warn("OpenRouter rate limit hit (429). Falling back to direct Gemini API.");
        return callGeminiDirect({ system, user, tool });
      }
      throw new Error(`OpenRouter API error (status ${response.status}): ${errText}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      const textContent = data.choices?.[0]?.message?.content;
      if (textContent) {
        try {
          const parsed = extractJson(textContent);
          if (typeof parsed === "string") {
            try {
              return extractJson(parsed);
            } catch (e) {
              // ignore
            }
          }
          return parsed;
        } catch (err) {
          throw new Error(`Model returned plain text and failed to parse as JSON: ${textContent}`);
        }
      }
      throw new Error(`No tool call or response message returned from model`);
    }

    try {
      const parsed = extractJson(toolCall.function.arguments);
      if (typeof parsed === "string") {
        try {
          return extractJson(parsed);
        } catch (e) {
          // ignore
        }
      }
      return parsed;
    } catch (err) {
      throw new Error(`Failed to parse tool call arguments as JSON: ${toolCall.function.arguments}`);
    }
  } catch (error: any) {
    if (process.env.GEMINI_API_KEY) {
      console.warn("Error calling OpenRouter. Falling back to direct Gemini API. Error details:", error.message || error);
      return callGeminiDirect({ system, user, tool });
    }
    throw error;
  }
}

// ── Palette Lock (Phase 1) ──────────────────────────────────────────────────
async function generateStyleContext(prompt: string, model: string): Promise<Palette> {
  const res = await callModel({
    system: "Extract or infer a cohesive 2-3 color hex palette matching the user's described style.",
    user: prompt,
    tool: generateStyleContextTool,
    model,
  });
  if (!res.palette) {
    throw new Error("Palette context response is missing the palette object");
  }
  return res.palette;
}

// ── Sort Sections ────────────────────────────────────────────────────────────
function sortSections(sections: SectionType[]): SectionType[] {
  return [...sections].sort((a, b) => CANONICAL_ORDER.indexOf(a) - CANONICAL_ORDER.indexOf(b));
}

// ── Build Prompts ────────────────────────────────────────────────────────────
function buildSectionPrompt(sectionType: SectionType, userPrompt: string, palette: Palette): string {
  return dedent`
    Generate ONE section of a landing page as a flat ElementMap fragment.

    SECTION TYPE: ${sectionType}
    SECTION LAYOUT: ${SECTION_PURPOSE[sectionType]}
    ID PREFIX: every id you create MUST start with "${sectionType}-"
    ORIGINAL USER REQUEST (for tone/content/style only): ${userPrompt}

    LOCKED PALETTE (use exactly these, do not invent new colors):
      background: ${palette.background}   surface: ${palette.surface ?? palette.background}
      primary: ${palette.primary}         secondary: ${palette.secondary ?? palette.primary}
      text primary: ${palette.textPrimary}  text secondary: ${palette.textSecondary}

    RULES:
    - Section root element: "parentId": "__body".
    - Every id in any "children" array must exist as a key in your output.
    - Leaf text elements (h1-h6, text, button, link) get "content"; containers/sections omit it or set empty string "".
    - ID Prefix: every element's id and referenced children must start with "${sectionType}-".
    - Output ONLY the tool call.
  `;
}

// ── Validate Section ─────────────────────────────────────────────────────────
function validateSection(elements: any, sectionType: SectionType): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!elements || typeof elements !== "object") {
    errors.push(`Section ${sectionType} is not a valid object`);
    return { valid: false, errors };
  }

  const ids = new Set(Object.keys(elements));
  if (ids.size === 0) {
    errors.push(`Section ${sectionType} elements map is empty`);
    return { valid: false, errors };
  }

  const roots = Object.values(elements).filter(
    (el: any) => el && el.parentId === "__body"
  );
  if (roots.length === 0) {
    errors.push(`Section ${sectionType} lacks a root element with parentId "__body"`);
  }

  for (const [id, el] of Object.entries(elements)) {
    if (!el || typeof el !== "object") {
      errors.push(`Element "${id}" is not an object`);
      continue;
    }
    // Prefix check
    if (!id.startsWith(`${sectionType}-`)) {
      errors.push(`Element ID "${id}" does not start with prefix "${sectionType}-"`);
    }

    // Children check
    const children = (el as any).children;
    if (!Array.isArray(children)) {
      errors.push(`Element "${id}" has non-array children`);
    } else {
      for (const childId of children) {
        if (!ids.has(childId)) {
          errors.push(`"${id}" references missing child "${childId}"`);
        } else {
          const childEl = elements[childId];
          if (childEl && childEl.parentId !== id) {
            errors.push(`"${childId}".parentId mismatch, expected "${id}" but got "${childEl.parentId}"`);
          }
        }
      }
    }

    // Parent ID check
    const parentId = (el as any).parentId;
    if (parentId !== "__body" && parentId !== null) {
      if (!ids.has(parentId)) {
        errors.push(`"${id}" has parentId "${parentId}" which is not in this section`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

// ── Merge (Phase 3) ──────────────────────────────────────────────────────────
function mergeSections(
  sectionResults: { sectionType: SectionType; elements: any }[]
): any {

        console.log("sayan-2st-allSections", sectionResults);

  const finalMap: any = {
    __body: {
      id: "__body",
      name: "Body",
      type: "__body",
      parentId: null,
      children: [],
      styles: { minHeight: "100vh", padding: "0px", margin: "0px", display: "flex", flexDirection: "column" },
    },
  };

  for (const { elements } of sectionResults) {
    for (const [id, el] of Object.entries(elements)) {
      finalMap[id] = el;
      if ((el as any).parentId === "__body") {
        finalMap.__body.children.push(id);
      }
    }
  }

        console.log("sayan-3st-merge function ki returen korbe", finalMap);

  return finalMap;
}

// ── Main Route handler ────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const { prompt, selectedSections, model } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }
    if (!selectedSections || !Array.isArray(selectedSections) || selectedSections.length === 0) {
      return NextResponse.json({ error: "At least one section must be selected" }, { status: 400 });
    }

    // 1. Determine model fallback
    const targetModel = model || "google/gemini-2.0-flash-exp:free";

    // 2. Phase 1: Palette Lock
    let palette: Palette;
    try {
      palette = await generateStyleContext(prompt, targetModel);
    } catch (err: any) {
      console.error("Failed to generate palette lock:", err);
      // Fallback palette
      palette = {
        background: "#0f172a",
        surface: "#1e293b",
        primary: "#6366f1",
        secondary: "#8b5cf6",
        textPrimary: "#f8fafc",
        textSecondary: "#94a3b8",
      };
    }

    // 3. Sort selected sections canonically
    const orderedSections = sortSections(selectedSections);

    // 4. Phase 2: Parallel Section Generation with isolated retries
    const sectionResults = await Promise.all(
      orderedSections.map(async (sectionType) => {
        let attempts = 0;
        const maxAttempts = 3;
        let lastError = "";

        while (attempts < maxAttempts) {
          attempts++;
          try {
            console.log(`Generating section: ${sectionType} (attempt ${attempts})`);
            const rawRes = await callModel({
              system: SECTION_DESIGN_QUALITY_PROMPT,
              user: buildSectionPrompt(sectionType, prompt, palette),
              tool: generateWebpageTool,
              model: targetModel,
            });

            console.log("sayan-rawRes", sectionType, JSON.stringify(rawRes, null, 2));
            let elements = rawRes.elements || rawRes;
            if (typeof elements === "string") {
              try {
                elements = JSON.parse(elements);
              } catch (e) {
                console.error("Failed to secondary-parse elements string:", e);
              }
            }

            const { valid, errors } = validateSection(elements, sectionType);
            if (valid) {
              return { sectionType, elements };
            }

            lastError = `Validation failed: ${errors.join("; ")}`;
            console.warn(`Attempt ${attempts} failed for ${sectionType}. ${lastError}`);
          } catch (err: any) {
            lastError = err?.message || String(err);
            console.warn(`Attempt ${attempts} errored for ${sectionType}. ${lastError}`);
          }
        }

        throw new Error(`Failed to generate valid section "${sectionType}" after ${maxAttempts} attempts. Last error: ${lastError}`);
      })
    );

    // 5. Phase 3: Merge
    const finalMap = mergeSections(sectionResults);

    return NextResponse.json({ success: true, elements: finalMap });
  } catch (error: any) {
    console.error("AI website generation pipeline error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
