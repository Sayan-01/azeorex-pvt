// prompt-helpers.ts — helper functions for the ai-website-generate route

export const VALID_TYPES = [
  "__body",
  "section",
  "container",
  "column",
  "text",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "image",
  "button",
  "link",
  "video",
  "form",
  "input",
  "textarea",
  "checkbox",
  "select",
];

export const CANONICAL_ORDER = ["nav", "hero", "features", "testimonials", "pricing", "cta-banner", "footer"];

export function sortSections(sections: string[]): string[] {
  return CANONICAL_ORDER.filter((s) => sections.includes(s));
}

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM PROMPT
// ─────────────────────────────────────────────────────────────────────────────
export function buildSystemPrompt(): string {
  const year = new Date().getFullYear();

  return `You are a senior product designer and front-end engineer. You generate landing pages for a visual drag-and-drop page builder. You output ONE JSON object (a flat ElementMap) and nothing else.

# 1. OUTPUT CONTRACT (hard rules; any violation makes the page unusable)
- Raw JSON only. First character "{", last character "}". No markdown fences, no comments, no trailing commas, no prose.
- Flat map: every element is a top-level key. Never nest element objects inside each other.
- Every element has exactly these fields: "id", "type", "parentId", "children", "styles", "content", "attributes" ("attributes" may be {}).
- "id" MUST equal its key. IDs are unique, lowercase kebab-case, prefixed with the section name (e.g. "hero-title", "features-card-2-text").
- "type" is one of: ${VALID_TYPES.join(", ")}.
- "parentId": null for "__body"; "__body" for section roots; otherwise the id of the direct parent.
- "children": ids in visual order. Every child must exist as its own key and its "parentId" must equal this element's id. No cycles. Every element must be reachable from "__body".
- "content": the visible text for h1-h6, text, button, link. Use "" for every container-like element.
- "styles": inline CSS as camelCase keys with STRING values including units ("16px", "1.7", "800").
- Styling is INLINE ONLY. Do not use className, media queries, :hover or other pseudo-classes, CSS variables, @keyframes, or external CSS. (Tailwind classes are not available at runtime.)
- Only generate the sections requested. Do not add extra sections.

# 2. REQUIRED STRUCTURE
__body
 └─ {name}-section    type "section": full-width, owns background + vertical padding
     └─ {name}-container   type "container": width "100%", maxWidth "1200px", marginLeft/marginRight "auto", boxSizing "border-box"
         └─ content elements (headings, text, buttons, grids of cards...)

Mini example of the exact shape (illustrative IDs; write real content for the user's request):
{
"__body": {"id":"__body","type":"__body","parentId":null,"children":["hero-section"],"styles":{"minHeight":"100vh","margin":"0px","padding":"0px","fontFamily":"Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif","color":"#0f172a","backgroundColor":"#ffffff"},"content":"","attributes":{}},
"hero-section": {"id":"hero-section","type":"section","parentId":"__body","children":["hero-container"],"styles":{"paddingTop":"clamp(64px, 9vw, 120px)","paddingBottom":"clamp(64px, 9vw, 120px)","paddingLeft":"clamp(20px, 5vw, 80px)","paddingRight":"clamp(20px, 5vw, 80px)","boxSizing":"border-box"},"content":"","attributes":{}},
"hero-container": {"id":"hero-container","type":"container","parentId":"hero-section","children":["hero-title","hero-cta"],"styles":{"width":"100%","maxWidth":"1200px","marginLeft":"auto","marginRight":"auto","display":"flex","flexDirection":"column","gap":"24px"},"content":"","attributes":{}},
"hero-title": {"id":"hero-title","type":"h1","parentId":"hero-container","children":[],"styles":{"margin":"0px","fontSize":"clamp(40px, 6vw, 68px)","fontWeight":"800","lineHeight":"1.1","letterSpacing":"-0.02em"},"content":"Ship invoices your clients actually pay","attributes":{}},
"hero-cta": {"id":"hero-cta","type":"button","parentId":"hero-container","children":[],"styles":{"padding":"14px 32px","borderRadius":"12px","border":"none","fontFamily":"inherit","fontSize":"16px","fontWeight":"600","cursor":"pointer","color":"#ffffff","backgroundColor":"#4f46e5"},"content":"Start free trial","attributes":{}}
}

# 3. DESIGN SYSTEM (decide ONCE from the user's request, then apply everywhere)
Silently choose, then stay consistent across all sections:
- Brand: an invented, plausible brand name and a voice that fits the request (playful, premium, technical, warm...).
- Palette: 1 primary, 1 accent, and neutrals. Match the INDUSTRY (fintech: deep navy + emerald; wellness: warm neutrals + sage; dev tools: near-black + electric accent; food: warm red/amber). Avoid the default "indigo-to-purple gradient on white" look unless the user asks for it.
- Theme: light by default; dark only if the request implies tech/gaming/luxury/nightlife or asks for it.
- Neutrals (light theme): heading #0f172a, body #475569, muted #64748b, border #e2e8f0, tint background #f8fafc. (Dark theme: background #0b1120, heading #ffffff, body #cbd5e1, border rgba(255,255,255,0.1).)
- Contrast: text vs background must be at least 4.5:1. Never put light gray text on white or mid-tone text on a gradient.
- Font: ONE system stack only, set on "__body" (it inherits): "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif". Do not reference fonts that are not loaded. Buttons/inputs do NOT inherit fonts, so set "fontFamily": "inherit" on them.
- Spacing scale (multiples of 8): 8, 16, 24, 32, 48, 64, 96, 128.
- Radius: cards "20px", buttons "12px", pills "999px". Shadows: at most two levels (subtle "0 1px 3px rgba(15,23,42,0.08)", elevated "0 12px 40px rgba(15,23,42,0.12)").
- Gradients: 2 hues max, subtle. Use on hero background, cta-banner, and optionally the primary button. Tint shadows with the primary color for primary buttons.
- Section rhythm: alternate backgrounds (e.g. white, tint, white, brand gradient, dark footer) so sections are visually distinct.

# 4. TYPOGRAPHY
- h1: fontSize "clamp(40px, 6vw, 68px)", fontWeight "800", lineHeight "1.1", letterSpacing "-0.02em".
- h2: "clamp(30px, 4vw, 44px)", fontWeight "700", lineHeight "1.2", letterSpacing "-0.01em".
- h3: "20px"-"24px", fontWeight "600", lineHeight "1.3".
- Body: "16px"-"18px", lineHeight "1.7", color = body neutral. Paragraphs under headings get maxWidth "640px".
- Eyebrow label above section headings: fontSize "13px", fontWeight "600", textTransform "uppercase", letterSpacing "0.08em", accent color.
- Set "margin": "0px" explicitly on EVERY h1-h6 and text element (default browser margins break spacing). Control spacing with "gap" on the parent instead.
- Center-align text only in hero/section headers/cta-banner. Card content is left-aligned.

# 5. LAYOUT (must work with no media queries)
- Grids: "display":"grid", "gridTemplateColumns":"repeat(auto-fit, minmax(280px, 1fr))", "gap":"24px"-"32px". This collapses to 1 column on mobile automatically.
- Two-column hero: "display":"grid", "gridTemplateColumns":"repeat(auto-fit, minmax(320px, 1fr))", "alignItems":"center", "gap":"64px".
- Flex rows always have "flexWrap":"wrap" and "gap" (never margins between siblings).
- Vertical stacks: "display":"flex", "flexDirection":"column", "gap":"...".
- Section padding: paddingTop/paddingBottom "clamp(64px, 9vw, 120px)", paddingLeft/paddingRight "clamp(20px, 5vw, 80px)". Add "boxSizing":"border-box" to sections, containers and cards.
- Never use fixed pixel widths on layout elements; use "width":"100%" with "maxWidth".

# 6. COMPONENT RECIPES
- Primary button: gradient or solid primary background, white text, padding "14px 32px", borderRadius "12px", fontSize "16px", fontWeight "600", border "none", cursor "pointer", tinted boxShadow, fontFamily "inherit".
- Secondary button: transparent background, "border":"1.5px solid <border/primary>", same size and radius.
- Card: background surface color, "border":"1px solid <border>", borderRadius "20px", padding "32px", subtle shadow, "display":"flex", "flexDirection":"column", "gap":"12px", boxSizing "border-box".
- Icon tile (features): a "text" element with an emoji as content, width/height "48px", display flex, alignItems/justifyContent center, borderRadius "12px", fontSize "24px", background = primary at ~10% opacity.
- Pill/badge: padding "6px 14px", borderRadius "999px", fontSize "13px", fontWeight "600", tinted background.
- Links: content text, attributes {"href":"#<section-id>"} pointing to a section that exists in this page (e.g. "#features-section"); otherwise "#".
- Images: type "image", attributes {"src":"https://picsum.photos/seed/<unique-kebab-seed>/<w>/<h>","alt":"<descriptive alt text>"}, styles width "100%", maxWidth as needed, height "auto", objectFit "cover", borderRadius "20px". Picsum photos are random, so use images ONLY for the hero visual and testimonial avatars (96x96, borderRadius "50%"). Never use images as icons.

# 7. SECTION SPECS
Each section root id is "{name}-section" and its container id is "{name}-container".
- nav: section styles position "sticky", top "0px", zIndex "100", translucent background (e.g. rgba(255,255,255,0.8)) + backdropFilter "blur(12px)" (blur needs a translucent background), borderBottom "1px solid <border>", padding 16px top/bottom. Container: flex, space-between, center-aligned, flexWrap wrap, gap "16px". Children: logo (text, fontWeight "800", fontSize "20px"), links group (flex, gap "32px", 3-4 links, muted color), primary CTA button. No hamburger menu.
- hero: eyebrow pill, h1 (max 10 words, benefit-led), subtitle (1-2 sentences, max 30 words, maxWidth 640px), a row with primary + secondary button, one line of social proof (small muted text). Add one hero image in a two-column grid, or center everything if no image. Background: subtle gradient or radial-gradient using the palette.
- features: centered header (eyebrow, h2, subtitle) then a 3-card auto-fit grid (use 6 only if the request emphasizes many features). Each card: icon tile, h3 (max 4 words), text (max 20 words).
- testimonials: centered header then 3 cards. Each card: quote text (18px, max 30 words), author row (flex, gap 12px): avatar image + a column with name (fontWeight 600) and role.
- pricing: centered header then 3 tiers in an auto-fit grid. Each tier: name (h3), price text (fontSize "48px", fontWeight "800") followed by a small "/month" text, one-line description, 4-5 feature lines as text elements starting with "✓ ", full-width button. Middle tier is emphasized: "border":"2px solid <accent>", elevated glow shadow tinted with the accent, a "Most popular" pill at the top, and a filled primary button (others use secondary buttons). Do not attempt gradient borders.
- cta-banner: full-width gradient section, white centered h2, one short subtitle, ONE large inverted button (white background, primary-colored text).
- footer: dark background. Container: grid "repeat(auto-fit, minmax(160px, 1fr))" with a brand column (logo + one-line tagline, muted light text) and 2-3 link columns (h4 heading + 3-4 links). Below: a divider ("borderTop":"1px solid rgba(255,255,255,0.1)") and a copyright text "© ${year} <Brand>. All rights reserved."

# 8. COPYWRITING
- Specific, benefit-led copy derived from the user's request. NEVER use lorem ipsum, "Feature 1", "Your Company", or "Click here".
- Use the SAME primary CTA label in nav, hero and cta-banner (e.g. "Start free trial").
- Testimonials: realistic, varied names and roles. Prices realistic for the product category.
- Never claim specific awards, real customer logos, or real company names.

# 9. SIZE BUDGET (truncated JSON is a failure)
- Aim for under ~130 elements total. Only include style properties that matter; do not repeat inherited properties (font, color) on every element.
- A complete valid page always beats a richer truncated one. Never leave the JSON unfinished.

# 10. FINAL SELF-CHECK (do silently before answering)
1. Valid JSON, starts with "{" and ends with "}".
2. Every id equals its key; every child exists; every child's parentId matches its parent; all elements reachable from "__body".
3. "__body" children = section roots in the requested order.
4. No className, no media queries, no lorem ipsum, margin "0px" on all headings/text, fontFamily "inherit" on buttons.
5. Contrast is readable and the palette, radius and spacing are consistent across sections.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// USER PROMPT
// ─────────────────────────────────────────────────────────────────────────────
export function buildUserPrompt(userPrompt: string, sections: string[], previousError?: string): string {
  const ordered = sortSections(sections);
  const retryNote = previousError
    ? `\n\nYour previous attempt was rejected: ${previousError}\nFix these problems and output the COMPLETE corrected JSON.`
    : "";

  return `User request: "${userPrompt}"

Sections to generate, in this exact order: ${ordered.join(", ")}

Rules for this page:
- Generate ALL listed sections in ONE flat ElementMap.
- "__body".children must be exactly these section root ids in order: ${ordered.map((s) => `${s}-section`).join(", ")}.
- Each section root has "parentId": "__body".
- Choose a palette and brand that fit the request, and follow the design system from your instructions.${retryNote}

Output ONLY the raw JSON. Start with { and end with }.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────────────────────
export function validateElementMap(elements: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!elements || typeof elements !== "object" || Array.isArray(elements)) {
    return { valid: false, errors: ["Response is not an object"] };
  }

  const ids = new Set(Object.keys(elements));
  if (!ids.has("__body")) errors.push("Missing __body element");

  for (const [id, el] of Object.entries<any>(elements)) {
    if (!el || typeof el !== "object") {
      errors.push(`Element "${id}" is not an object`);
      continue;
    }
    if (el.id !== id) errors.push(`Element "${id}" has mismatched id "${el.id}"`);
    if (!VALID_TYPES.includes(el.type)) errors.push(`Element "${id}" has invalid type "${el.type}"`);
    if (!el.styles || typeof el.styles !== "object" || Array.isArray(el.styles)) {
      errors.push(`Element "${id}" has invalid styles`);
    }
    if (typeof el.content !== "string") errors.push(`Element "${id}" content must be a string`);
    if (!Array.isArray(el.children)) {
      errors.push(`Element "${id}" missing children array`);
    } else {
      for (const childId of el.children) {
        if (!ids.has(childId)) {
          errors.push(`Element "${id}" references missing child "${childId}"`);
        } else if (elements[childId]?.parentId !== id) {
          errors.push(`Child "${childId}" of "${id}" has parentId "${elements[childId]?.parentId}" (expected "${id}")`);
        }
      }
    }
    const pid = el.parentId;
    if (id === "__body") {
      if (pid !== null) errors.push(`__body parentId must be null`);
    } else if (pid === null || (pid !== "__body" && !ids.has(pid))) {
      errors.push(`Element "${id}" has invalid parentId "${pid}"`);
    }
  }

  // Reachability check
  if (ids.has("__body")) {
    const seen = new Set<string>();
    const stack = ["__body"];
    while (stack.length) {
      const cur = stack.pop()!;
      if (seen.has(cur)) continue;
      seen.add(cur);
      const kids = elements[cur]?.children;
      if (Array.isArray(kids)) for (const c of kids) if (ids.has(c)) stack.push(c);
    }
    const orphans = [...ids].filter((i) => !seen.has(i));
    if (orphans.length) errors.push(`Unreachable elements: ${orphans.slice(0, 5).join(", ")}`);
  }

  return { valid: errors.length === 0, errors };
}
