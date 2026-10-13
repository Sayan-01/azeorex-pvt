export type DeviceType = "Desktop" | "Tablet" | "Mobile";
export type DropPosition = "before" | "after" | "inside";

/**
 * "section"     → <section> — block element with full width by default
 * "container"   → <div>    — wrapper for group elements
 * "column"      → <div>    — flex/grid column
 * "text"        → <p>      — paragraph text
 * "heading"     → <h1>-<h6> — headings
 * "image"       → <img>    — image
 * "button"      → <button> — clickable button
 * "link"        → <a>      — hyperlink
 * "video"       → <video>  — video player
 * "form"        → <form>   — form wrapper
 * "input"       → <input>  — text input field
 * "textarea"    → <textarea>
 * "checkbox"    → <input type="checkbox">
 * "select"      → <select> dropdown
 * "__body"      → root container — heighest wrapper, cannot be deleted
 */

export type ElementType =
  | "__body"
  | "section"
  | "container"
  | "column"
  | "text"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "image"
  | "button"
  | "link"
  | "video"
  | "form"
  | "input"
  | "textarea"
  | "checkbox"
  | "select";

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

/**
 * উদাহরণ (3টা action-এর পর):
   *   history = [
   *     { elements: {...}, selectedId: null },      // ← initial
   *     { elements: {...}, selectedId: "text-1" },  // ← INSERT
   *     { elements: {...}, selectedId: "text-1" },  // ← UPDATE_STYLE
   *     { elements: {...}, selectedId: null },       // ← DELETE  ← historyIndex
   *   ]
   */
export type HistoryState = {
  elements: ElementMap;
  selectedId: string | null;
};


export type EditorState = {
  elements: ElementMap;
  selectedId: string | null;
  selectedElement: EditorElement | null;
  hoverId: string | null;
  draggedId: string | null;
  draggedComponent: EditorElement | null;
  dropTargetId: string | null;
  dropPosition: DropPosition | null;
  history: HistoryState[];
  historyIndex: number;
  device: DeviceType;
  previewMode: boolean;
  liveMode: boolean;
  saveLoading: boolean;
};

export type ElementMap = Record<string, EditorElement>;

export const initialElements: ElementMap = {
  __body: {
    id: "__body",
    name: "Body",
    type: "__body",
    parentId: null,
    children: ["hero-container"],
    styles: {
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 24px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#09090b",
      borderColor: "#000000",
    },
  },
  "hero-container": {
    id: "hero-container",
    name: "Hero Container",
    type: "container",
    parentId: "__body",
    children: ["hero-badge", "hero-title", "hero-subtitle", "hero-actions"],
    styles: {
      maxWidth: "680px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      margin: "0 auto",
      borderColor: "#000000",
    },
  },
  "hero-badge": {
    id: "hero-badge",
    name: "Badge",
    type: "text",
    parentId: "hero-container",
    children: [],
    content: "✨ AI-Powered Website Canvas",
    styles: {
      fontSize: "12px",
      fontWeight: "500",
      letterSpacing: "0.05em",
      color: "#52525b",
      backgroundColor: "#e8e8e8",
      border: "1px solid #e4e4e7",
      borderRadius: "9999px",
      padding: "6px 14px",
      marginBottom: "24px",
      display: "inline-block",
    },
  },
  "hero-title": {
    id: "hero-title",
    name: "Heading",
    type: "h1",
    parentId: "hero-container",
    children: [],
    content: "Build Stunning Websites in Seconds",
    styles: {
      fontSize: "44px",
      fontWeight: "700",
      lineHeight: "1.15",
      letterSpacing: "-0.03em",
      color: "#09090b",
      marginBottom: "16px",
    },
  },
  "hero-subtitle": {
    id: "hero-subtitle",
    name: "Subtitle",
    type: "text",
    parentId: "hero-container",
    children: [],
    content: "Use the AI Chat on the left to generate entire pages, or click any element here to edit text and styles directly.",
    styles: {
      fontSize: "16px",
      lineHeight: "1.6",
      color: "#71717a",
      maxWidth: "520px",
      marginBottom: "32px",
    },
  },
  "hero-actions": {
    id: "hero-actions",
    name: "Actions Wrapper",
    type: "container",
    parentId: "hero-container",
    children: ["hero-btn-primary", "hero-btn-secondary"],
    styles: {
      display: "flex",
      gap: "12px",
      justifyContent: "center",
      flexWrap: "wrap",
    },
  },
  "hero-btn-primary": {
    id: "hero-btn-primary",
    name: "Primary Button",
    type: "button",
    parentId: "hero-actions",
    children: [],
    content: "Start Prompting",
    styles: {
      backgroundColor: "#09090b",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "600",
      padding: "10px 22px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
    },
  },
  "hero-btn-secondary": {
    id: "hero-btn-secondary",
    name: "Secondary Button",
    type: "button",
    parentId: "hero-actions",
    children: [],
    content: "Explore Elements",
    styles: {
      backgroundColor: "#ffffff",
      color: "#09090b",
      fontSize: "14px",
      fontWeight: "500",
      padding: "10px 22px",
      borderRadius: "8px",
      border: "1px solid #cccccc",
      cursor: "pointer",
      borderColor: "#cccccc",
    },
  },
};

export const initialState: EditorState = {
  elements: initialElements,  
  selectedId: null,
  selectedElement: null,
  hoverId: null,
  draggedId: null,
  draggedComponent: null,
  dropTargetId: null,
  dropPosition: null,

  history: [
    {
      elements: initialElements,
      selectedId: null,
    },
  ],
  historyIndex: 0,

  device: "Desktop",
  previewMode: false,
  liveMode: false,
  saveLoading: false,
};
