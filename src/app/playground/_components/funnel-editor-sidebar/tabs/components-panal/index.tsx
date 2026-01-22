"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlignLeft, Component, Heading1, Heading2, ImageIcon, Link, SquareDashed, TextSelect } from "lucide-react";
import React, { useState } from "react";
import { EditorElement } from "../../../../../../../providers/editor/editor-actions";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import ComponentItem from "../component-item";
import { Button } from "@/components/ui/button";

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
        content: "Hello!",
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
          maxWidth: "940px",
          backgroundColor: "#f3f4f6",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
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
          width: "100%",
          position: "relative",
          backgroundColor: "#ffffff",
          marginBottom: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
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
        styles: { width: "100%", height: "auto", objectFit: "contain" },
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
    {
      icon: (
        <Component
          strokeWidth={1.6}
          className="w-6 h-6"
        />
      ),
      label: "Components",
      component: {
        id: "temp",
        type: "button",
        name: "Button",
        content: "Click me!",
        styles: {
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "10px",
          backgroundImage: "linear-gradient(90deg, #06b6d4, #3b82f6)",
          color: "#ffffff",
          textDecoration: "none",
        },
        attributes: { className: "hover:opacity-90 transition" },
      },
      group: "elements",
    },
  ];

  const handleDragStart = (component: EditorElement) => {
    console.log(component);
    
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
              
              <ComponentItem
                key={index}
                icon={item.id}
                className="pb-1"
                component={item}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            );
          })}
          {state.selectedElement?.type !== null && state.selectedElement?.type !== "__body" ? (
            <Button
              size="sm"
              className="bg-[#22dd6626] hover:bg-[#22dd6626] mb-4 text-[#21DB66] w-full editor_text"
              onClick={() => {
                setComponents((prev: any) => [...prev, state.selectedElement]);
              }}
            >
              Create components
            </Button>
          ) : (
            <></>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ComponentsTab;
