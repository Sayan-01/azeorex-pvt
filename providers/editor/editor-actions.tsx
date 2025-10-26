import { DeviceTypes } from "./editor-provider";

export type EditorAction =
  | { type: "SET_HTML"; payload: { html: string } }
  | { type: "SELECT_ELEMENT"; payload: { element: HTMLElement | null } }
  | { type: "TOGGLE_PREVIEW_MODE" }
  | { type: "TOGGLE_LIVE_MODE"; payload?: { value?: boolean } }
  | { type: "CHANGE_DEVICE"; payload: { device: DeviceTypes } }
  | { type: "SET_ZOOM"; payload: { zoom: number } }
  | { type: "START_DRAG" }
  | { type: "STOP_DRAG" }
  | { type: "START_INLINE_EDIT" }
  | { type: "STOP_INLINE_EDIT" }
  | { type: "UPDATE_SELECTED_ELEMENT_STYLE"; payload: { property: string; value: string } };
