import type { DeviceType, DropPosition, EditorElement, EditorState, ElementMap } from "./editor-types";

// ─────────────────────────────────────────────────────────────────────────────
// Flat-map utilities
// All operations work directly on the flat ElementMap — no recursion needed.
// ─────────────────────────────────────────────────────────────────────────────

/** Return a new map with element `id` removed and its parent's children updated. */
export function removeElement(id: string, elements: ElementMap): ElementMap {
  const el = elements[id];
  if (!el || id === "__body") return elements;

  const next: ElementMap = { ...elements };

  // Detach from parent
  if (el.parentId && next[el.parentId]) {
    next[el.parentId] = {
      ...next[el.parentId],
      children: next[el.parentId].children.filter((c: any) => c !== id),
    };
  }

  // Collect all descendants (BFS) and delete them too
  const queue = [id];
  while (queue.length) {
    const cur = queue.shift()!;
    const node = next[cur];
    if (!node) continue;
    node.children.forEach((c: any) => queue.push(c));
    delete next[cur];
  }

  return next;
}

/** Deep-clone a dragged element and its subtree with new unique IDs */
export function cloneDraggedElement(element: EditorElement, newParentId: string | null, elements: ElementMap): { cloned: ElementMap; newRootId: string } {
  const newId = `${element.name}-${Math.random().toString(36).slice(2, 8)}`;
  const cloned: ElementMap = {};

  const newChildren: string[] = [];
  if (element.children && element.children.length > 0) {
    for (const childId of element.children) {
      const childEl = elements[childId];
      if (childEl) {
        const { cloned: childCloned, newRootId: childRootId } = cloneDraggedElement(childEl, newId, elements);
        Object.assign(cloned, childCloned);
        newChildren.push(childRootId);
      }
    }
  }

  cloned[newId] = {
    ...element,
    id: newId,
    parentId: newParentId,
    children: newChildren,
  };

  return { cloned, newRootId: newId };
}

/** Insert `element` relative to `targetId` based on `position`. */
export function insertElement(element: EditorElement, targetId: string, position: DropPosition, elements: ElementMap): { nextElements: ElementMap; newId: string } {
  const target = elements[targetId];
  if (!target) return { nextElements: elements, newId: element.id };

  const targetParentId = position === "inside" ? targetId : (target.parentId ?? null);
  const { cloned, newRootId } = cloneDraggedElement(element, targetParentId, elements);

  const next: ElementMap = { ...elements, ...cloned };

  if (position === "inside") {
    // Append as last child of target
    next[targetId] = {
      ...target,
      children: [...target.children, newRootId],
    };
  } else {
    // before | after: insert into target's parent sibling list
    const parentId = target.parentId;
    if (parentId && next[parentId]) {
      const siblings = [...next[parentId].children];
      const idx = siblings.indexOf(targetId);
      const insertAt = position === "before" ? idx : idx + 1;
      siblings.splice(insertAt, 0, newRootId);

      next[parentId] = { ...next[parentId], children: siblings };
    }
  }

  return { nextElements: next, newId: newRootId };
}

/** Move existing element `id` relative to `targetId`. */
export function moveElement(id: string, targetId: string, position: DropPosition, elements: ElementMap): ElementMap {
  if (id === targetId || id === "__body") return elements;

  // Prevent moving a parent into its own descendant
  let check: string | null = targetId;
  while (check) {
    if (check === id) return elements;
    check = elements[check]?.parentId ?? null;
  }

  // Detach from old parent first (without deleting descendants)
  const el = elements[id];
  if (!el) return elements;

  let next: ElementMap = { ...elements };
  if (el.parentId && next[el.parentId]) {
    next[el.parentId] = {
      ...next[el.parentId],
      children: next[el.parentId].children.filter((c: any) => c !== id),
    };
  }

  const target = next[targetId];
  if (!target) return elements;

  if (position === "inside") {
    next[targetId] = { ...target, children: [...target.children, id] };
    next[id] = { ...el, parentId: targetId };
  } else {
    const parentId = target.parentId;
    if (!parentId || !next[parentId]) return elements;

    const siblings = [...next[parentId].children];
    const idx = siblings.indexOf(targetId);
    siblings.splice(position === "before" ? idx : idx + 1, 0, id);

    next[parentId] = { ...next[parentId], children: siblings };
    next[id] = { ...el, parentId };
  }

  return next;
}

/** Update a single element's style property. */
export function updateStyle(id: string, property: string, value: string, elements: ElementMap): ElementMap {
  const el = elements[id];
  if (!el) return elements;
  return {
    ...elements,
    [id]: {
      ...el,
      styles: { ...(el.styles ?? {}), [property]: value },
    },
  };
}

/** Update element content (text/image src/alt). */
export function updateContent(id: string, content: string, elements: ElementMap): ElementMap {
  const el = elements[id];
  if (!el) return elements;
  return { ...elements, [id]: { ...el, content } };
}

/** Deep-clone a subtree into new IDs (for DUPLICATE_ELEMENT) */
function cloneSubtree(id: string, newParentId: string | null, elements: ElementMap): { cloned: ElementMap; newRootId: string } {
  const newId = `${id}-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const el = elements[id];
  const cloned: ElementMap = {};

  const newChildren: string[] = [];
  for (const childId of el.children) {
    const { cloned: childCloned, newRootId: childRootId } = cloneSubtree(childId, newId, elements);
    Object.assign(cloned, childCloned);
    newChildren.push(childRootId);
  }

  cloned[newId] = {
    ...el,
    id: newId,
    parentId: newParentId,
    children: newChildren,
  };

  return { cloned, newRootId: newId };
}

export function updateAttribute(id: string, attributeName: string, value: string, elements: ElementMap): ElementMap {
  const el = elements[id];
  if (!el) return elements;
  return {
    ...elements,
    [id]: {
      ...el,
      attributes: { ...(el.attributes ?? {}), [attributeName]: value },
    },
  };
}

/** O(1) ancestor look-up: walk parentId chain. */
export function getAncestors(id: string, elements: ElementMap): string[] {
  const ancestors: string[] = [];
  let cur = elements[id]?.parentId ?? null;
  while (cur) {
    ancestors.push(cur);
    cur = elements[cur]?.parentId ?? null;
  }
  return ancestors;
}

/** Collect all descendant IDs (BFS, O(n) where n = subtree size). */
export function getDescendants(id: string, elements: ElementMap): string[] {
  const result: string[] = [];
  const queue = [...(elements[id]?.children ?? [])];
  while (queue.length) {
    const cur = queue.shift()!;
    result.push(cur);
    elements[cur]?.children.forEach((c: any) => queue.push(c));
  }
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// Action union  (identical surface to v1 — drop-in compatible)
// ─────────────────────────────────────────────────────────────────────────────

export type EditorAction =
  // Element mutations (auto-saved to history)
  | { type: "UPDATE_STYLE"; payload: { id: string; property: string; value: string } }
  | { type: "UPDATE_CONTENT"; payload: { id: string; content: string } }
  | { type: "UPDATE_ATTRIBUTE"; payload: { id: string; attributeName: string; value: string } }
  | { type: "UPDATE_ELEMENT"; payload: { element: EditorElement } }
  | { type: "DELETE_ELEMENT"; payload: { id: string } }
  | { type: "INSERT_ELEMENT"; payload: { element: EditorElement; targetId: string; position: DropPosition } }
  | { type: "MOVE_ELEMENT"; payload: { id: string; targetId: string; position: DropPosition } }
  // Batch mutation — apply multiple style changes in one history entry
  | { type: "BATCH_UPDATE_STYLES"; payload: { id: string; styles: Record<string, string> } }
  // Duplicate element + entire subtree
  | { type: "DUPLICATE_ELEMENT"; payload: { id: string } }

  // History
  | { type: "SAVE_TO_HISTORY"; payload: { elements: ElementMap; selectedId: string | null } }
  | { type: "UNDO" }
  | { type: "REDO" }

  // Selection
  | { type: "SET_SELECTED_ID"; payload: { selectedId: string | null } }

  // Hover
  | { type: "SET_HOVER_ID"; payload: { hoverId: string | null } }

  // Drag & drop
  | { type: "SET_DRAGGED_ID"; payload: { draggedId: string | null } }
  | { type: "SET_DRAGGED_COMPONENT"; payload: { draggedComponent: EditorElement | null } }
  | { type: "SET_DROP_TARGET"; payload: { dropTargetId: string | null; dropPosition: DropPosition | null } }

  // UI
  | { type: "SET_DEVICE"; payload: { device: DeviceType } }
  | { type: "TOGGLE_PREVIEW_MODE" }
  | { type: "LOAD_DATA"; payload: { elements: ElementMap; liveMode: boolean } };

// ─────────────────────────────────────────────────────────────────────────────
// History snapshot
// ─────────────────────────────────────────────────────────────────────────────

interface HistorySnapshot {
  elements: ElementMap;
  selectedId: string | null;
  selectedElement: EditorElement | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// History helper
// ─────────────────────────────────────────────────────────────────────────────

const MAX_HISTORY = 100; // cap to avoid unbounded memory growth

const pushHistory = (state: EditorState, elements: ElementMap, selectedId: string | null): EditorState => {
  const snapshot: HistorySnapshot = {
    elements,
    selectedId,
    selectedElement: selectedId ? (elements[selectedId] ?? null) : null,
  };

  // Truncate redo branch, then append; respect MAX_HISTORY cap
  const trimmed = state.history.slice(Math.max(0, state.historyIndex + 1 - MAX_HISTORY), state.historyIndex + 1);
  const history = [...trimmed, snapshot];

  return {
    ...state,
    elements,
    selectedId,
    selectedElement: selectedId ? (elements[selectedId] ?? null) : null,
    history,
    historyIndex: history.length - 1,
  };
};

const applySnapshot = (state: EditorState, snap: HistorySnapshot): EditorState => ({
  ...state,
  elements: snap.elements,
  selectedId: snap.selectedId,
  selectedElement: snap.selectedId ? (snap.elements[snap.selectedId] ?? null) : null,
});

// ─────────────────────────────────────────────────────────────────────────────
// Reducer
// ─────────────────────────────────────────────────────────────────────────────

export const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    // ── Element mutations ──────────────────────────────────────────────────

    case "UPDATE_STYLE": {
      const { id, property, value } = action.payload;
      const next = updateStyle(id, property, value, state.elements);
      return pushHistory(state, next, state.selectedId);
    }

    case "UPDATE_CONTENT": {
      const { id, content } = action.payload;
      const next = updateContent(id, content, state.elements);
      return pushHistory(state, next, state.selectedId);
    }

    case "UPDATE_ATTRIBUTE": {
      const { id, attributeName, value } = action.payload;
      const next = updateAttribute(id, attributeName, value, state.elements);
      return pushHistory(state, next, state.selectedId);
    }

    case "UPDATE_ELEMENT": {
      const { element } = action.payload;
      if (!state.elements[element.id]) return state;
      const next = { ...state.elements, [element.id]: element };
      return pushHistory(state, next, state.selectedId);
    }

    case "DELETE_ELEMENT": {
      const { id } = action.payload;
      if (id === "__body") return state;
      const next = removeElement(id, state.elements);
      return pushHistory(state, next, null);
    }

    case "INSERT_ELEMENT": {
      const { element, targetId, position } = action.payload;
      const { nextElements, newId } = insertElement(element, targetId, position, state.elements);
      return pushHistory(state, nextElements, newId);
    }

    case "MOVE_ELEMENT": {
      const { id, targetId, position } = action.payload;
      if (id === targetId) return state;
      const next = moveElement(id, targetId, position, state.elements);
      return pushHistory(state, next, state.selectedId);
    }

    // NEW ── Duplicate element + entire subtree, insert as next sibling
    case "DUPLICATE_ELEMENT": {
      const { id } = action.payload;
      if (id === "__body") return state;
      const el = state.elements[id];
      if (!el || !el.parentId) return state;

      const { cloned, newRootId } = cloneSubtree(id, el.parentId, state.elements);
      let next: ElementMap = { ...state.elements, ...cloned };

      // Insert new root after original in parent's children list
      const parent = next[el.parentId];
      const siblings = [...parent.children];
      const idx = siblings.indexOf(id);
      siblings.splice(idx + 1, 0, newRootId);
      next[el.parentId] = { ...parent, children: siblings };

      return pushHistory(state, next, newRootId);
    }

    // ── History ────────────────────────────────────────────────────────────

    case "SAVE_TO_HISTORY": {
      const { elements, selectedId } = action.payload;
      return pushHistory(state, elements, selectedId);
    }

    case "UNDO": {
      if (state.historyIndex <= 0) return state;
      return { ...applySnapshot(state, state.history[state.historyIndex - 1] as HistorySnapshot), selectedId: state.history[state.historyIndex - 1]?.selectedId, historyIndex: state.historyIndex - 1 };
    }

    case "REDO": {
      if (state.historyIndex >= state.history.length - 1) return state;
      return { ...applySnapshot(state, state.history[state.historyIndex + 1] as HistorySnapshot), selectedId: state.history[state.historyIndex + 1]?.selectedId, historyIndex: state.historyIndex + 1 };
    }

    // ── Selection ──────────────────────────────────────────────────────────

    case "SET_SELECTED_ID": {
      const { selectedId } = action.payload;
      return {
        ...state,
        selectedId,
        selectedElement: selectedId ? (state.elements[selectedId] ?? null) : null,
      };
    }

    // ── Hover ──────────────────────────────────────────────────────────────

    case "SET_HOVER_ID":
      return { ...state, hoverId: action.payload.hoverId };

    // ── Drag & drop ────────────────────────────────────────────────────────

    case "SET_DRAGGED_ID":
      return { ...state, draggedId: action.payload.draggedId };

    case "SET_DRAGGED_COMPONENT":
      return { ...state, draggedComponent: action.payload.draggedComponent };

    case "SET_DROP_TARGET":
      return {
        ...state,
        dropTargetId: action.payload.dropTargetId,
        dropPosition: action.payload.dropPosition,
      };

    // ── UI ─────────────────────────────────────────────────────────────────

    case "SET_DEVICE":
      return { ...state, device: action.payload.device };

    case "TOGGLE_PREVIEW_MODE":
      return { ...state, previewMode: !state.previewMode };

    case "LOAD_DATA": {
      const { elements, liveMode } = action.payload;
      const snap: HistorySnapshot = { elements, selectedId: null, selectedElement: null };
      return {
        ...state,
        elements,
        liveMode,
        selectedId: null,
        selectedElement: null,
        history: [snap],
        historyIndex: 0,
      };
    }

    default:
      return state;
  }
};
