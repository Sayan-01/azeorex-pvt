# AI Page Generation Architecture

### User write prompt -> Select sections -> palette lock -> Parallel Generation -> merge -> final output

**Target:** Drag-and-drop website builder — AI page generation feature
**AI API:** OpenRouter Integration (free only)

## 0. Project Context

This project is a **drag-and-drop website builder** built with React/Next.js.

Users can:

- Build websites manually using the drag-and-drop editor.
- Build websites using AI by providing a natural-language prompt.
- Edit the generated website inside the existing visual editor.

The AI must generate data that is directly compatible with the editor's existing `EditorElement` structure.

**Tool use (a.k.a. function calling)** is a distinct API feature, not just a prompting
trick:

1. You describe a "tool" to the model as a **JSON Schema** — e.g. "there is a function
   called `generate_webpage_elements`, and its arguments must look like this shape:
   `{ id, type, parentId, children, styles, ... }`."
2. The model doesn't execute anything itself. It responds by saying, in effect,
   "call this tool with these arguments" — and the arguments are emitted in a
   dedicated structured output channel, separate from its normal text response,
   because the model was specifically trained to produce this format.
3. Your code reads that structured payload directly. Parsing risk drops sharply
   compared to extracting JSON from free text, because this isn't "text that
   happens to look like JSON" — it's a distinct model output mode built for this.

Instead of asking the model to write JSON as free text (which can come back with
markdown fences, missing fields, or truncation), you describe a function's expected
arguments as a JSON Schema, and the model returns structured arguments matching that
schema directly — a distinct, dedicated output mode, not "text that looks like JSON."
This is what makes the JSON coming out of every call below structurally reliable.
Works with Anthropic's API natively, and with OpenRouter/OpenAI-compatible endpoints
as long as the specific model supports the `tools` parameter (not all free models do —
filter at `openrouter.ai/models?supported_parameters=tools`).

---

## 1. Goals

- Generate a full landing page as a flat `ElementMap` from a single user text prompt.
- Guarantee structurally valid JSON output (no markdown fences, no parse failures) via tool use.
- Avoid quality degradation on long pages by generating each section independently instead of one giant call.
- Reuse the exact same section-generation building block for a later feature: regenerating/editing a single section without touching the rest of the page.
- Keep merge/validation logic deterministic and AI-free — correctness should never depend on the model "getting IDs right" across the whole page.

## 2. High-level flow

- User writes a free-text prompt describing the page (style, purpose, colors, etc.).
- User picks which sections to include from a fixed checklist UI (nav, hero, features,
  testimonials, pricing, cta-banner, footer). Each section type can be selected **at
  most once** — no duplicates.
- Submit is disabled unless at least one section is selected. No prompt-only submission.
- On submit: one small palette-lock call, then all selected sections generate in
  parallel, then a deterministic merge assembles the final page.

```
User prompt + selected sections (checklist, min 1)
   │
   ▼
┌─────────────────────────────────────────────┐
│ PHASE 1: Reads prompt → A small AI call     |
│ which create fixed hex color palette which  │
| is a common color source for all section.   |
└─────────────────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────────────┐
│  ORDER SORT  (pure code, no AI)              │
│  Selected sections → sorted by               │
│  CANONICAL_ORDER (nav → hero → ... → footer) │
└─────────────────────────────────────────────┘
   |
   ▼
┌─────────────────────────────────────────────┐
│  PHASE 2 — Parallel Section Generation       │
│  (N AI calls, fired together)                │
│                                               │
│  hero-call   features-call   footer-call ... │
│  each gets: sectionType + static layout      │
│  template + locked palette + user prompt     │
│                                               │
│  → returns flat elements, root parentId =    │
│    "__PARENT__" (placeholder)                │
└─────────────────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────────────┐
│  PHASE 3 — Merge  (pure code, no AI)         │
│  "__PARENT__" → "__body"                     │
│  push section roots into __body.children     │
│  in the SORTED order — not arrival order     │
└─────────────────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────────────┐
│  VALIDATE  (pure code)                       │
│  Check every id / parentId / children link   │
│  Bad section? → retry only that one          │
└─────────────────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────────────┐
│  FINAL ElementMap → sent to editor           │
└─────────────────────────────────────────────┘
```

---

## 3. Data model (already defined in the project — reused as-is Existing Editor Contract Is the Source of Truth)

```typescript
export type ElementType =
  | "__body" | "section" | "container" | "column"
  | "text" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "image" | "button" | "link" | "video"
  | "form" | "input" | "textarea" | "checkbox" | "select";

export type EditorElement = {
  id: string;
  name?: string;
  type: ElementType;
  parentId: string | null;
  children: string[];
  content?: string;
  styles: React.CSSProperties;
  attributes?: Record<string, string>;
};

export type ElementMap = Record<string, EditorElement>;

export type SectionType =
  "nav" | "hero" | "features" | "testimonials" | "pricing" | "cta-banner" | "footer";

```

## Example AI output

```json
{
  "hero": {
    "id": "hero",
    "name": "Section",
    "type": "section",
    "parentId": "__body",
    "children": ["...", "..."],
    "styles": {
      "minHeight": "100vh",
      "backgroundColor": "#f3f4f6",
      "padding": "20px"
    }
  },
  "...": "..."
}
```

This is a **single section output thats follow `EditorElement` structure**.



No changes needed to this type for this architecture. Everything below produces or consumes exactly this shape.

---

## 5. Phase 1 — Palette lock (small, fast, mandatory)

Purpose: the user's prompt describes style loosely ("dark background, orange accent") —
without a single shared source of truth, each section call would independently
interpret that description and likely pick slightly different hex values. This call
fixes that with one cheap round trip before generation starts.

```typescript
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

async function generateStyleContext(prompt: string): Promise<Palette> {
  const res = await callModel({
    system: "Extract or infer a cohesive 2-3 color hex palette matching the user's described style.",
    user: prompt,
    tool: generateStyleContextTool,
  });
  return res.palette;
}
```

Typically well under 500 tokens — this is the one call that must complete *before*
Phase 2 starts, since every section prompt needs `palette` injected.

---

## 6. Phase 2 — Parallel section generation

### 6.1 Static purpose templates (no AI needed for this part)

```typescript
const SECTION_PURPOSE: Record<SectionType, string> = {
  "nav": "Sticky top nav: logo + links + a gradient CTA button, subtle bottom border.",
  "hero": "Full-width hero: gradient-text h1, subtitle p, primary + secondary CTA buttons.",
  "features": "Section with a 'grid md:grid-cols-3 gap-8' container of 3+ cards (icon + h3 + p).",
  "testimonials": "2-3 quote cards: quote p + name h3 + role p.",
  "pricing": "3 tier cards, middle tier visually emphasized with a gradient border.",
  "cta-banner": "Full-width gradient section with h2 + button.",
  "footer": "Dark section: logo + link columns + copyright p.",
};
```

### 6.2 Tool schema (same shape as prior versions)

```typescript
export const generateWebpageTool = {
  name: "generate_webpage_elements",
  description:
    "Generate a flat ElementMap fragment for ONE section. The section root's " +
    "parentId must be the literal string '__PARENT__'.",
  input_schema: {
    type: "object",
    additionalProperties: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        type: { type: "string", enum: ["__body","section","container","column","text","h1","h2","h3","h4","h5","h6","image","button","link","video","form","input","textarea","checkbox","select"] },
        parentId: { type: ["string", "null"] },
        children: { type: "array", items: { type: "string" } },
        content: { type: "string" },
        styles: { type: "object", additionalProperties: { type: "string" } },
        attributes: { type: "object", additionalProperties: { type: "string" } },
      },
      required: ["id", "type", "parentId", "children", "styles"],
    },
  },
} as const;
```

### 6.3 Prompt + parallel call

```typescript
function buildSectionPrompt(sectionType: SectionType, userPrompt: string, palette: Palette): string {
  return dedent`
  Generate ONE section of a landing page as a flat ElementMap fragment.

  SECTION TYPE: ${sectionType}
  SECTION LAYOUT: ${SECTION_PURPOSE[sectionType]}
  ID PREFIX: every id you create MUST start with "${sectionType}-"
  ORIGINAL USER REQUEST (for tone/content/style only, not for choosing sections): ${userPrompt}

  LOCKED PALETTE (use exactly these, do not invent new colors):
    background: ${palette.background}   surface: ${palette.surface ?? palette.background}
    primary: ${palette.primary}         secondary: ${palette.secondary ?? palette.primary}
    text primary: ${palette.textPrimary}  text secondary: ${palette.textSecondary}

  RULES:
  - Section root element: "parentId": "__PARENT__" (literal placeholder).
  - Every id in any "children" array must exist as a key in your output.
  - Leaf text elements (h1-h6, text, button, link) get "content"; containers omit it.
  - [design quality bar: typography scale, spacing scale, card/button/gradient
    polish rules — reused verbatim from the base design-quality prompt]
  - Output ONLY the tool call.
  `;
}

async function generatePage(prompt: string, selectedSections: SectionType[]): Promise<ElementMap> {
  const orderedSections = sortSections(selectedSections);       // Section 4 — canonical order
  const palette = await generateStyleContext(prompt);           // Section 5 — palette lock

  const sectionResults = await Promise.all(
    orderedSections.map((sectionType) =>
      callModel({
        system: SECTION_DESIGN_QUALITY_PROMPT,
        user: buildSectionPrompt(sectionType, prompt, palette),
        tool: generateWebpageTool,
      }).then((elements) => ({ sectionType, elements: elements as ElementMap }))
    )
  );
  // sectionResults[i] corresponds to orderedSections[i] — guaranteed by Promise.all
  // semantics, regardless of which network call actually finished first.

  return mergeSections(sectionResults);
}
```

---

## 7. Phase 3 — Merge and validate (deterministic, no AI)

```typescript
function mergeSections(
  sectionResults: { sectionType: SectionType; elements: ElementMap }[]
): ElementMap {
  const finalMap: ElementMap = {
    __body: {
      id: "__body", name: "Body", type: "__body",
      parentId: null, children: [], styles: { minHeight: "100vh" },
    },
  };

  // Iterate in sectionResults order — which is already CANONICAL_ORDER, because
  // orderedSections was sorted before the Promise.all call above. Never re-sort
  // or re-derive order here; just consume the array as given.
  for (const { elements } of sectionResults) {
    for (const [id, el] of Object.entries(elements)) {
      const resolved = { ...el, parentId: el.parentId === "__PARENT__" ? "__body" : el.parentId };
      finalMap[id] = resolved;
      if (resolved.parentId === "__body") finalMap.__body.children.push(id);
    }
  }
  return finalMap;
}

function validateElementMap(map: ElementMap): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const ids = new Set(Object.keys(map));
  if (!map.__body || map.__body.parentId !== null) errors.push("Missing/invalid __body");

  for (const [id, el] of Object.entries(map)) {
    for (const childId of el.children) {
      if (!ids.has(childId)) errors.push(`"${id}" references missing child "${childId}"`);
      else if (map[childId].parentId !== id)
        errors.push(`"${childId}".parentId mismatch, expected "${id}"`);
    }
  }
  return { valid: errors.length === 0, errors };
}
```

If a specific section fails validation, retry only that section's generation call and
re-run the merge — never regenerate the whole page for one bad section.

---


## 8. OpenRouter compatibility (if not using Anthropic directly)

- Tool schema wraps as `{ type: "function", function: { name, description, parameters } }`;
  `tool_choice: { type: "function", function: { name: "..." } }`.
- Response arguments arrive as a JSON **string** in `choices[0].message.tool_calls[0].function.arguments` — `JSON.parse` it; wrap in try/catch (weaker models occasionally emit malformed JSON here).
- Not all free models support `tools` — filter at `openrouter.ai/models?supported_parameters=tools` before picking a model. Confirmed-reliable free options as of mid-2026: DeepSeek Chat v3 (free), Qwen3-Coder (free), Qwen3-235B.
- Free tier rate limit is 20 requests/minute (after the $10 top-up that unlocks 1000/day). With at most 7 sections + 1 palette call = 8 requests per generation, this fits under the limit even fully parallel — no concurrency throttling needed at this section count.
- Keep the model id in an env variable; free model slugs rotate without notice.

---

## 9. Why this is the final architecture

- **No AI-driven section selection** → removes the least predictable reasoning step entirely; replaced by deterministic UI state.
- **No duplicate-section-id problem** → each `SectionType` is single-instance by UI design, so `sectionType` itself is a safe, unique id prefix.
- **No ordering bug possible** → order is fixed at `CANONICAL_ORDER`, applied once before generation, never re-derived from click order or network timing.
- **No color drift** → one small, fast palette-lock call shared by every parallel section call.
- **Fast** → one small call + N parallel calls (N ≤ 7), well within free-tier rate limits.
- **Cheap to extend** → adding a new section type later is one entry in `CANONICAL_ORDER` + `SECTION_PURPOSE`, nothing structural changes.
