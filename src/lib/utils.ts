import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EditorElement } from "../../providers/editor/editor-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(timestamp: any): any {
  const now = new Date();
  const past = new Date(timestamp);
  const difference = now.getTime() - past.getTime();

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 7) return `${days} days ago`;
  if (weeks < 4) return `${weeks} weeks ago`;
  if (months < 12) return `${months} months ago`;
  return `${years} years ago`;
}

export const ddmmyyyy = (date: Date) => {
  const d = new Date(date);
  return d.toDateString();
};

// Helper: Get element by ID
export const getElementById = (id: string, elements: Record<string, EditorElement>): EditorElement | null => {
  return elements[id] || null;
};

// Helper: Flatten old nested structure
export const flattenOldStructure = (nested: any): Record<string, EditorElement> => {
  const elements: Record<string, EditorElement> = {};

  const traverse = (node: any, parentId: string | null) => {
    if (!node || !node.id) return;
    const id = node.id;
    const childrenIds: string[] = [];

    if (Array.isArray(node.content)) {
      node.content.forEach((child: any) => {
        childrenIds.push(child.id);
        traverse(child, id);
      });
    }

    elements[id] = {
      ...node,
      parentId,
      children: childrenIds,
      content: typeof node.content === "string" ? node.content : null,
    };
  };

  traverse(nested, null);
  return elements;
};
