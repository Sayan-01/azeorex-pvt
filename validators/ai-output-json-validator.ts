import { ElementMap } from "../providers/editor/editor-types";

export const validateFlatMap = (parsed: Record<string, unknown>): ElementMap | null => {
  const values = Object.values(parsed);
  if (values.length === 0) return null;

  const isFlat = values.every(
    (v) => v && typeof v === "object" && !Array.isArray(v) && "id" in (v as object) && "type" in (v as object) && "children" in (v as object) && Array.isArray((v as any).children),
  );

  if (!isFlat) return null;

  // __body must exist
  if (!parsed["__body"]) return null;

  return parsed as ElementMap;
};
