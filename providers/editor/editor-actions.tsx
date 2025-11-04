export type EditorElement = {
  id: string;
  name: string;
  type: "div" | "h1" | "h2" | "h3" | "p" | "button" | "img" | "section" | "a" | "__body";
  content: string | EditorElement[];
  styles: React.CSSProperties;
  classes?: string;
  attributes?: Record<string, string>;
};

export type HistoryState = {
  elements: EditorElement;
  selectedId: string | null;
};

export type DeviceType = "Desktop" | "Tablet" | "Mobile";

export type EditorState = {
  elements: EditorElement;
  selectedId: string | null;
  selectedElement: EditorElement | null;
  hoverId: string | null;
  draggedId: string | null;
  draggedComponent: EditorElement | null;
  dropTargetId: string | null;
  dropPosition: "before" | "after" | "inside" | null;
  history: HistoryState[];
  historyIndex: number;
  device: DeviceType;
  previewMode: boolean;
  liveMode: boolean;
  saveLoading: boolean;
};

export const initialJSON: EditorElement = {
  id: "__body",
  type: "__body",
  name: "Body",
  styles: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "20px",
  },
  content: [
    {
      id: "title-1",
      type: "h1",
      name: "Heading 1",
      content: "Welcome to AI Website Builder",
      styles: {
        fontSize: "36px",
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: "16px",
      },
    },
  ],
};
