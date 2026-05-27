export type DeviceType = "Desktop" | "Tablet" | "Mobile";
export type DropPosition = "before" | "after" | "inside";

/**
 * "section"     → <section> — বড় ব্লক, সাধারণত full-width row
 * "container"   → <div>    — grouping করার জন্য wrapper
 * "column"      → <div>    — flex/grid column
 * "text"        → <p>      — paragraph text
 * "heading"     → <h1>-<h6> — শিরোনাম
 * "image"       → <img>    — ছবি
 * "button"      → <button> — click করার বোতাম
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
  "__body": {
    id: "__body",
    name: "Body",
    type: "__body",
    parentId: null,
    children: ["title-1"],
    styles: {
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
      padding: "20px",
    },
  },

  "title-1": {
    id: "title-1",
    name: "Heading 1",
    type: "h1",
    parentId: "__body",
    children: [],
    content: "Welcome to AI Website Builder",
    styles: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "16px",
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
