"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EditorContentType } from "@/types/types";
import React, { useState } from "react";
import TextPlaceholder from "./text-placeholder";
import ContainerPlaceholder from "./container-placeholder";
import VideoPlaceholder from "./video-placeholder";
import TwoColumnsPlaceholder from "./two-columns-placeholder";
import LinkPlaceholder from "./link-placeholder";
import ContactFormComponentPlaceholder from "./contact-form-placeholder";
import CheckoutPlaceholder from "./checkout-placeholder";
import SectionPlaceholder from "./section-placeholder";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import { Button } from "@/components/ui/button";
import ImagePlaceholder from "./image-placeholder";
import SvgPlaceholder from "./svg-placeholder";
import HeadingPlaceholder from "./heading-placeholder";
import { AlignLeft, Container, Heading1, Heading2, ImageIcon, Link, SquareDashed, TextSelect } from "lucide-react";
import { EditorElement } from "../../../../../../../providers/editor/editor-actions";
import ComponentItem from "../component-item";

const ComponentsTab = () => {
  const { state, dispatch } = useEditor();
  const [components, setComponents] = useState<any>([]);

  const elements: {
    icon: React.ReactNode;
    label: string;
    component: EditorElement;
    group: "layout" | "elements";
  }[] = [
    {
      icon: <Heading1 className="w-6 h-6" />,
      label: "Heading 1",
      component: {
        id: "temp",
        type: "h1",
        name: "Heading 1",
        content: "New Heading",
        styles: { fontSize: "36px", fontWeight: "bold", color: "#1f2937", marginBottom: "16px" },
      },
      group: "elements",
    },
    {
      icon: <Heading2 className="w-6 h-6" />,
      label: "Heading 2",
      component: {
        id: "temp",
        type: "h2",
        name: "Heading 2",
        content: "New Heading 2",
        styles: { fontSize: "28px", fontWeight: "600", color: "#1f2937", marginBottom: "12px" },
      },
      group: "elements",
    },
    {
      icon: <AlignLeft className="w-6 h-6" />,
      label: "Text",
      component: {
        id: "temp",
        type: "p",
        name: "Text",
        content: "New paragraph text here.",
        styles: { fontSize: "16px", color: "#4b5563", lineHeight: "1.6" },
      },
      group: "elements",
    },
    {
      icon: <SquareDashed className="w-6 h-6" />,
      label: "Container",
      component: {
        id: "temp",
        type: "div",
        name: "Container",
        content: [],
        styles: {
          position: "relative",
          padding: "20px",
          backgroundColor: "#f3f4f6",
          minHeight: "100px",
        },
      },
      group: "layout",
    },
    {
      icon: <TextSelect className="w-6 h-6" />,
      label: "Section",
      component: {
        id: "temp",
        type: "section",
        name: "Section",
        content: [],
        styles: {
          position: "relative",
          padding: "40px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          marginBottom: "20px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        },
      },
      group: "layout",
    },
    {
      icon: (
        <ImageIcon
          strokeWidth={1.6}
          className="w-6 h-6"
        />
      ),
      label: "Image",
      component: {
        id: "temp",
        type: "img",
        name: "Image",
        content: "",
        styles: { width: "100px", height: "100px", objectFit: "contain" },
        attributes: { src: "/image-placeholder.png" },
      },
      group: "elements",
    },
    {
      icon: (
        <Link
          strokeWidth={1.6}
          className="w-6 h-6"
        />
      ),
      label: "Link",
      component: {
        id: "temp",
        type: "a",
        name: "Link",
        content: "New Link",
        styles: { fontSize: "16px", color: "#4b5563", lineHeight: "1.6" },
        attributes: { href: "#" },
      },
      group: "elements",
    },
  ];

  const handleDragStart = (component: EditorElement) => {
    dispatch({ type: "SET_DRAGGED_COMPONENT", payload: { draggedComponent: component } });
  };

  const handleDragEnd = () => {
    dispatch({ type: "SET_DRAGGED_COMPONENT", payload: { draggedComponent: null } });
  };

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Layout", "Elements", "Components"]}
    >
      <AccordionItem
        value="Layout"
        className=" py-0 border-b-[1px] border-main-black"
      >
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-3">
          {elements
            .filter((element) => element.group === "layout")
            .map((element, index) => (
              <ComponentItem
                key={index}
                icon={element.icon}
                label={element.label}
                component={element.component}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="Elements"
        className=" py-0 border-main-black"
      >
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          {elements
            .filter((element) => element.group === "elements")
            .map((element, index) => (
              <ComponentItem
                key={index}
                icon={element.icon}
                label={element.label}
                component={element.component}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="Components"
        className=" py-0 border-main-black"
      >
        <AccordionTrigger className="!no-underline">Your components</AccordionTrigger>
        <AccordionContent className="pb-0 ">
          {components.map((item: any, index: number) => {
            return (
              <div
                id={item.id}
                onDragStart={(e) => {
                  e.dataTransfer.setData("componentType", JSON.stringify(item));
                }}
                draggable
                className="mb-2 rounded-md bg-zinc-800 text-xs p-2 px-3"
              >
                {item?.name}: {item?.id?.substring(0, 8)}...
              </div>
            );
          })}
          {/* {state.editor.selectedElement.type !== null && state.editor.selectedElement.type !== "__body" ? (
            <Button
              size="sm"
              className="bg-[#22dd6626] hover:bg-[#22dd6626] mb-4 text-[#21DB66] w-full editor_text"
              onClick={() => {
                setComponents([...components, state.editor.selectedElement]);
                console.log(components);
              }}
            >
              Create components
            </Button>
          ) : (
            <></>
          )} */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ComponentsTab;
