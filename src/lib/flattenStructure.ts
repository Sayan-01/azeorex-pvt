
// ─────────────────────────────────────────────────────────────────────────────
// Type map — AI generates raw HTML tags, we convert to semantic types
// ─────────────────────────────────────────────────────────────────────────────

import { EditorElement, ElementMap } from "../../providers/editor/editor-types";

const TAG_TO_TYPE: Record<string, EditorElement["type"]> = {
  __body: "__body",
  section: "section",
  div: "container",
  header: "section",
  footer: "section",
  nav: "container",
  main: "section",
  article: "container",
  aside: "container",
  ul: "container",
  ol: "container",
  li: "container",
  span: "text",
  p: "text",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  img: "image",
  a: "link",
  button: "button",
  input: "input",
  textarea: "textarea",
  select: "select",
  form: "form",
  video: "video",
};


// ─────────────────────────────────────────────────────────────────────────────
// Unique ID generator — keeps original id if clean, otherwise generates new
// ─────────────────────────────────────────────────────────────────────────────

const usedIds = new Set<string>();

const makeUniqueId = (raw: string): string => {
  // clean the id
  const base = (raw || "el")
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);

  if (!usedIds.has(base)) {
    usedIds.add(base);
    return base;
  }

  // deduplicate with counter
  let i = 2;
  while (usedIds.has(`${base}-${i}`)) i++;
  const unique = `${base}-${i}`;
  usedIds.add(unique);
  return unique;
};

// ─────────────────────────────────────────────────────────────────────────────
// Safe attribute extraction — only allowed attributes pass through
// ─────────────────────────────────────────────────────────────────────────────

const HEADING_LEVEL: Record<string, string> = {
  h1: "1",
  h2: "2",
  h3: "3",
  h4: "4",
  h5: "5",
  h6: "6",
};

const ALLOWED_ATTRS = new Set(["className", "src", "alt", "href", "level"]);

const safeAttributes = (raw: Record<string, unknown> | undefined, type: string): Record<string, string> => {
  if (!raw) return {};

  const result: Record<string, string> = {};

  for (const [key, val] of Object.entries(raw)) {
    if (!ALLOWED_ATTRS.has(key)) continue;
    if (typeof val !== "string") continue;
    result[key] = val;
  }

  // inject heading level from tag name if missing
  if (HEADING_LEVEL[type] && !result.level) {
    result.level = HEADING_LEVEL[type];
  }

  return result;
};

// ─────────────────────────────────────────────────────────────────────────────
// Core recursive flattener
// ─────────────────────────────────────────────────────────────────────────────

const flattenNode = (node: Record<string, unknown>, parentId: string | null, map: ElementMap): string => {
  const rawId = typeof node.id === "string" ? node.id : `el-${Math.random().toString(36).slice(2, 7)}`;
  const id = makeUniqueId(rawId);
  const rawType = typeof node.type === "string" ? node.type : "div";
  const type = TAG_TO_TYPE[rawType] ?? "container";

  // parse content
  const content = node.content;
  let textContent: string | undefined;
  const childNodes: Record<string, unknown>[] = [];

  if (typeof content === "string") {
    textContent = content;
  } else if (Array.isArray(content)) {
    for (const item of content) {
      if (item && typeof item === "object" && !Array.isArray(item)) {
        childNodes.push(item as Record<string, unknown>);
      }
      // silently skip invalid items (string inside array etc.)
    }
  }

  // flatten children first to get their ids
  const childIds: string[] = [];
  for (const child of childNodes) {
    const childId = flattenNode(child, id, map);
    childIds.push(childId);
  }

  // build element
  const element: EditorElement = {
    id,
    type,
    parentId,
    children: childIds,
    styles: typeof node.styles === "object" && node.styles !== null ? (node.styles as Record<string, string>) : {},
    attributes: safeAttributes(node.attributes as Record<string, unknown> | undefined, rawType),
    ...(textContent !== undefined && childIds.length === 0 ? { content: textContent } : {}),
  };

  map[id] = element;
  return id;
};

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * flattenStructure
 *
 * AI-generated nested JSON → flat ElementMap
 *
 * Usage:
 *   const elements = flattenStructure(parsedAiJson);
 *   dispatch({ type: "LOAD_DATA", payload: { elements, liveMode: false } });
 */
export const flattenStructure = (nested: Record<string, unknown>): ElementMap => {
  usedIds.clear(); // reset dedup state for each call

  const map: ElementMap = {};

  // handle both { id: "__body", ... } and { elements: {...} } shapes
  const root = nested.elements ? (nested.elements as Record<string, unknown>) : nested;

  if (!root || typeof root !== "object") {
    console.error("flattenStructure: invalid input", nested);
    return map;
  }

  flattenNode(root as Record<string, unknown>, null, map);

  // safety: ensure __body exists
  if (!map["__body"]) {
    console.warn("flattenStructure: no __body found, wrapping");
    const rootId = Object.keys(map)[0];
    if (rootId) {
      // rename root element to __body
      const rootEl = map[rootId];
      map["__body"] = { ...rootEl, id: "__body", parentId: null };
      delete map[rootId];
      // fix children's parentId
      for (const childId of map["__body"].children) {
        if (map[childId]) map[childId] = { ...map[childId], parentId: "__body" };
      }
    }
  }

  return map;
};
