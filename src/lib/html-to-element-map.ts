import { nanoid } from "nanoid";
import { EditorElement, ElementMap, ElementType } from "../../providers/editor/editor-types";

// Convert a style string (e.g. "color: red; font-size: 16px") into a React CSSProperties object.
function parseInlineStyle(styleString: string | null): React.CSSProperties {
  if (!styleString) return {};
  const styles: Record<string, string> = {};
  
  // A regex to match CSS property: value pairs, handling nested colons and semicolons (e.g. in urls or gradients)
  const ruleRegex = /([\w-]+)\s*:\s*([^;]+(?:;(?!\s*[\w-]+\s*:)[^;]*)*)(?:;|$)/g;
  
  let match;
  while ((match = ruleRegex.exec(styleString)) !== null) {
    const prop = match[1].trim();
    let val = match[2].trim();
    if (val.endsWith(";")) {
      val = val.slice(0, -1).trim();
    }
    
    // Camel case the property
    const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    styles[camelProp] = val;
  }
  return styles;
}

const tagToTypeMap: Record<string, ElementType> = {
  SECTION: "section",
  DIV: "container",
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",
  P: "text",
  A: "link",
  BUTTON: "button",
  IMG: "image",
  VIDEO: "video",
  FORM: "form",
  INPUT: "input",
  TEXTAREA: "textarea",
  SELECT: "select",
};

export function htmlToElementMap(html: string): ElementMap {
  const map: ElementMap = {};
  const bodyElement: EditorElement = {
    id: "__body",
    name: "Body",
    type: "__body",
    parentId: null,
    children: [],
    styles: { minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "20px" },
    attributes: {},
    content: ""
  };
  map["__body"] = bodyElement;

  if (typeof window === "undefined" || !window.DOMParser) {
    // If not in browser or missing DOMParser, return empty body
    return map;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  
  function processNode(node: Node, parentId: string): string | null {
    if (node.nodeType === Node.TEXT_NODE) {
      // Ignored here, handled by parent if parent is text-capable
      return null;
    }
    
    if (node.nodeType !== Node.ELEMENT_NODE) return null;
    const el = node as HTMLElement;
    const tagName = el.tagName;
    
    // Skip scripts, styles, etc.
    if (tagName === "SCRIPT" || tagName === "STYLE" || tagName === "HTML" || tagName === "HEAD" || tagName === "BODY" || tagName === "META" || tagName === "TITLE") {
      return null;
    }

    // Determine type
    let type = tagToTypeMap[tagName];
    if (!type) {
      // Unknown tags: fallback to container if it has element children, else text
      const hasElementChild = Array.from(el.childNodes).some(n => n.nodeType === Node.ELEMENT_NODE);
      type = hasElementChild ? "container" : "text";
    }
    
    // Images: ensure alt exists
    if (tagName === "IMG" && !el.getAttribute("alt")) {
      el.setAttribute("alt", "Image");
    }

    const id = `${type}-${nanoid(6)}`;
    const name = type.charAt(0).toUpperCase() + type.slice(1);
    
    const childrenIds: string[] = [];
    let contentStr = "";
    
    // Check if it should be text only
    const textCapableTypes = ["text", "h1", "h2", "h3", "h4", "h5", "h6", "button", "link"];
    let isTextCapable = textCapableTypes.includes(type);
    
    // If a container type only has text nodes (no element children), convert to text
    if (!isTextCapable && type === "container") {
      const childNodes = Array.from(el.childNodes);
      const onlyText = childNodes.every(n => n.nodeType === Node.TEXT_NODE || (n.nodeType === Node.ELEMENT_NODE && ["BR", "B", "I", "STRONG", "EM", "SPAN"].includes((n as HTMLElement).tagName)));
      if (onlyText && el.textContent?.trim()) {
        type = "text";
        isTextCapable = true;
      }
    }

    if (isTextCapable) {
      // Flatten text
      contentStr = el.textContent?.trim() || "";
    } else {
      // Process children
      for (let i = 0; i < el.childNodes.length; i++) {
        const childId = processNode(el.childNodes[i], id);
        if (childId) {
          childrenIds.push(childId);
        }
      }
    }

    const styles = parseInlineStyle(el.getAttribute("style"));
    
    const attributes: Record<string, string> = {};
    const allowlistedAttrs = ["class", "href", "src", "alt", "type", "placeholder"];
    
    for (let i = 0; i < el.attributes.length; i++) {
      const attr = el.attributes[i];
      if (allowlistedAttrs.includes(attr.name)) {
        if (attr.name === "class") {
          attributes["className"] = attr.value;
        } else if (attr.name === "href" && attr.value.toLowerCase().startsWith("javascript:")) {
          // drop javascript urls
        } else {
          attributes[attr.name] = attr.value;
        }
      }
    }

    map[id] = {
      id,
      name,
      type,
      parentId,
      children: childrenIds,
      styles,
      attributes,
      content: contentStr
    };
    
    return id;
  }
  
  // Parse top level nodes
  Array.from(doc.body.childNodes).forEach(node => {
    const id = processNode(node, "__body");
    if (id) {
      bodyElement.children.push(id);
    }
  });

  return map;
}

export function validateElementMap(map: ElementMap): void {
  const allIds = new Set(Object.keys(map));
  
  if (!map["__body"]) {
    console.warn("Validation: missing __body. Adding one.");
    map["__body"] = { id: "__body", type: "__body", parentId: null, children: [], styles: {}, attributes: {}, name: "Body" };
    allIds.add("__body");
  } else if (map["__body"].parentId !== null) {
    console.warn("Validation: __body parentId is not null. Fixing.");
    map["__body"].parentId = null;
  }
  
  const childOf = new Map<string, string>(); // childId -> parentId
  
  for (const [id, element] of Object.entries(map)) {
    // 1. Every parentId must exist
    if (element.parentId !== null && !allIds.has(element.parentId)) {
      console.warn(`Validation: element ${id} has non-existent parent ${element.parentId}. Attaching to __body.`);
      element.parentId = "__body";
      if (!map["__body"].children.includes(id)) {
        map["__body"].children.push(id);
      }
    }
    
    // 2. Every child must exist
    const validChildren = [];
    for (const childId of element.children) {
      if (!allIds.has(childId)) {
        console.warn(`Validation: element ${id} references non-existent child ${childId}. Removing.`);
      } else {
        validChildren.push(childId);
        
        // 3. No element in two parents
        if (childOf.has(childId)) {
          console.warn(`Validation: child ${childId} belongs to multiple parents (${childOf.get(childId)} and ${id}). Keeping with ${id}.`);
          // Remove from previous parent
          const prevParentId = childOf.get(childId)!;
          map[prevParentId].children = map[prevParentId].children.filter(c => c !== childId);
        }
        childOf.set(childId, id);
      }
    }
    element.children = validChildren;
  }
  
  // 4. Check for orphans
  for (const id of allIds) {
    if (id !== "__body" && !childOf.has(id)) {
      console.warn(`Validation: element ${id} is an orphan. Attaching to __body.`);
      map[id].parentId = "__body";
      map["__body"].children.push(id);
    }
  }
}
