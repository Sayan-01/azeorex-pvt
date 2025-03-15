"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EditorElement, useEditor } from "../../../../../../../../providers/editor/editor-provider";
import clsx from "clsx";
import { BoxSelect, Columns2, Contact2, CreditCardIcon, ImageIcon, Link2Icon, TextSelect, TypeIcon, Youtube } from "lucide-react";
import type React from "react";
import { useState, useCallback } from "react";

type RecursiveAccordianItemProps = {
  element: EditorElement;
  index: number;
  parentId?: string;
};

const RecursiveAccordianItem = (props: RecursiveAccordianItemProps) => {
  const { state, dispatch } = useEditor();
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isValidDrop, setIsValidDrop] = useState(true);
  const [dragData, setDragData] = useState<{
    id: string;
    index: number;
    parentId: string;
    ancestorIds: string[];
  } | null>(null);

  // Get all ancestor IDs for validation
  const getAncestorIds = useCallback((elements: EditorElement[], elementId: string, ancestors: string[] = []): string[] => {
    for (const element of elements) {
      if (element.id === elementId) {
        return ancestors;
      }

      if (Array.isArray(element.content) && element.content.length > 0) {
        const found = getAncestorIds(element.content, elementId, [...ancestors, element.id]);
        if (found.length > 0) return found;
      }
    }
    return [];
  }, []);

  // Check if the drop is valid
  const isValidDropTarget = useCallback((draggedElementId: string, draggedParentId: string, draggedAncestorIds: string[], targetElementId: string, targetParentId: string): boolean => {
    // Don't allow dropping into itself or its descendants
    if (draggedElementId === targetElementId) return false;

    // Don't allow dropping into its own descendants
    if (draggedAncestorIds.includes(targetElementId)) return false;

    // Only allow dropping into the same parent or siblings at the same level
    const isValid = draggedParentId === targetParentId;
    console.log("isValidDropTarget:", isValid); // 🟢 Debugging line
    return isValid;
  }, []);

  const handleSelectElement = (e: React.MouseEvent, element: EditorElement) => {
    e.stopPropagation();

    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: { elementDetails: element },
    });
  };

  const handleDragStart = (e: React.DragEvent, element: EditorElement, index: number) => {
    e.stopPropagation();
    setIsDragging(true);

    // Get all ancestor IDs for validation
    const ancestorIds = getAncestorIds(state.editor.elements, element.id);

    // Store the dragged element's data
    const data = {
      id: element.id,
      index: index,
      parentId: props.parentId || "__body",
      ancestorIds,
    };

    setDragData(data); // 🟢 Set dragData state
    e.dataTransfer.setData("application/json", JSON.stringify(data)); // 🟢 Ensure valid JSON
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragData(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Get the dragged element data
      let data;
      if (dragData) {
        data = dragData; // Use dragData if available
      } else {
        const jsonData = e.dataTransfer.getData("application/json");
        if (!jsonData) {
          console.error("No data found in dataTransfer");
          return;
        }
        data = JSON.parse(jsonData); // Parse JSON data
      }

      // Validate if this is a valid drop target
      const valid = isValidDropTarget(data.id, data.parentId, data.ancestorIds, props.element.id, props.parentId || "__body");

      setIsValidDrop(valid); // 🟢 Set isValidDrop state
      setIsOver(true);
      e.dataTransfer.dropEffect = valid ? "move" : "none";
    } catch (error) {
      console.error("Error in drag over:", error);
      setIsValidDrop(false); // 🟢 Set isValidDrop to false on error
      setIsOver(false);
    }
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number, targetParentId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);

    try {
      let data;
      if (dragData) {
        data = dragData; // Use dragData if available
      } else {
        const jsonData = e.dataTransfer.getData("application/json");
        if (!jsonData) {
          console.error("No data found in dataTransfer");
          return;
        }
        data = JSON.parse(jsonData); // Parse JSON data
      }

      const { id: draggedId, index: draggedIndex, parentId: sourceParentId, ancestorIds } = data;

      // Validate if this is a valid drop target
      const valid = isValidDropTarget(draggedId, sourceParentId, ancestorIds, props.element.id, targetParentId);

      // Don't do anything if dropping onto itself or invalid target
      if (!valid || (draggedIndex === dropIndex && sourceParentId === targetParentId)) {
        return;
      }

      // Dispatch action to move element
      dispatch({
        type: "MOVE_ELEMENT",
        payload: {
          elementId: draggedId,
          sourceParentId,
          sourceIndex: draggedIndex,
          destinationParentId: targetParentId,
          destinationIndex: dropIndex,
        },
      });

      console.log(`Moved element from index ${draggedIndex} to ${dropIndex}`);
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case "container":
        return (
          <BoxSelect
            size={16}
            className="text-muted-foreground"
          />
        );
      case "image":
        return (
          <ImageIcon
            size={16}
            className="text-muted-foreground"
          />
        );
      case "__body":
        return (
          <BoxSelect
            size={16}
            className="text-muted-foreground"
          />
        );
      case "contactForm":
        return (
          <Contact2
            size={16}
            className="text-muted-foreground"
          />
        );
      case "2Col":
        return (
          <Columns2
            size={16}
            className="text-muted-foreground"
          />
        );
      case "section":
        return (
          <TextSelect
            size={16}
            className="text-muted-foreground"
          />
        );
      case "paymentForm":
        return (
          <CreditCardIcon
            size={16}
            className="text-muted-foreground"
          />
        );
      case "text":
        return (
          <TypeIcon
            size={16}
            className="text-muted-foreground"
          />
        );
      case "link":
        return (
          <Link2Icon
            size={16}
            className="text-muted-foreground"
          />
        );
      case "video":
        return (
          <Youtube
            size={16}
            className="text-muted-foreground"
          />
        );
      default:
        return null;
    }
  };

  // Render element with children (using accordion)
  if (Array.isArray(props.element.content) && props.element.content.length > 0) {
    return (
      <>
        <AccordionItem
          value={props.element.id}
          className={clsx("transition-all border-b-0 border-r-0 border-l-none border-main-black select-none hover:pb-0", {
            "pl-4": props.element.type !== "__body",
            "opacity-50": isDragging,
          })}
          draggable={props.element.type !== "__body"}
          onDragStart={(e) => handleDragStart(e, props.element, props.index)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, props.index, props.parentId || "__body")}
        >
          <div
            className={clsx("relative duration-200", {
              "border-t border-green-500": isOver && isValidDrop,
              "border-t border-red-500": isOver && !isValidDrop,
            })}
          >
            <AccordionTrigger
              className={clsx("!no-underline p-2 pl-0 text-sm outline outline-1 outline-transparent outline-offset-[-1px] border-b rounded-lg", {
                "bg-muted-foreground/20 rounded-lg": state.editor.selectedElement.id === props.element.id,
              })}
              onClick={(e) => handleSelectElement(e, props.element)}
            >
              <div className="flex items-center gap-2 pl-4 text-xs">
                {getElementIcon(props.element.type || "")}
                <p className="opacity-80">{props.element.name}</p>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="flex flex-col pb-0">
            {Array.isArray(props.element.content) &&
              props.element.content.map((childElement, childIndex) => (
                <RecursiveAccordianItem
                  key={childElement.id}
                  element={childElement}
                  index={childIndex}
                  parentId={props.element.id}
                />
              ))}
          </AccordionContent>
        </AccordionItem>
      </>
    );
  }

  // Render leaf element (no children)
  return (
    <>
      <div
        className={clsx("relative flex items-center gap-2 pl-4 ml-4 py-2 cursor-move text-xs outline outline-1 outline-transparent outline-offset-[-1px] border-b rounded-lg", {
          "!ml-0": props.element.type === "__body",
          "bg-muted-foreground/20 rounded-lg": state.editor.selectedElement.id === props.element.id,
          "opacity-50": isDragging,
          "outline-green-500": isOver && isValidDrop,
          "outline-red-500": isOver && !isValidDrop,
        })}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, props.element, props.index)}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, props.index, props.parentId || "__body")}
        onClick={(e) => handleSelectElement(e, props.element)}
      >
        {getElementIcon(props.element.type || "")}
        <p className="opacity-80">{props.element.name}</p>
      </div>
    </>
  );
};

const LayersTab = () => {
  const { state } = useEditor();

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-3">Navigator</h3>
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["__body"]}
      >
        {state.editor.elements.map((childElement, idx) => (
          <RecursiveAccordianItem
            key={childElement.id}
            element={childElement}
            index={idx}
            parentId="__root"
          />
        ))}
      </Accordion>
    </div>
  );
};

export default LayersTab;
