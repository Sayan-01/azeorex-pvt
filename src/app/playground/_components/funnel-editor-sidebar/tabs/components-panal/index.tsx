"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlignLeft, Component, Heading1, Heading2, ImageIcon, Link, SquareDashed, TextSelect, Columns2, Heading3, Heading4, Heading5, Heading6, Video, CheckSquare, Type, FileText, List, Frame } from "lucide-react";
import React, { useState } from "react";
import { EditorElement } from "../../../../../../../providers/editor/editor-types";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import ComponentItem from "../component-item";
import { Button } from "@/components/ui/button";

const ComponentsTab = () => {
  const { state, dispatch } = useEditor();
  const [components, setComponents] = useState<any>([]);
  const makeId = () => `el-${Math.random().toString(36).slice(2, 8)}`;

  const elements: {
    label: string;
    icon: React.ReactNode;
    component: EditorElement;
    group: "layout" | "typography" | "media" | "forms";
  }[] = [
    {
      icon: <Heading1 className="w-6 h-6" />,
      label: "Heading 1",
      component: {
        id: makeId(),
        type: "h1",
        name: "Heading 1",
        parentId: null,
        children: [],
        content: "New Heading",
        styles: { fontSize: "36px", fontWeight: "bold", color: "#1f2937", marginBottom: "16px" },
      },
      group: "typography",
    },
    {
      icon: <Heading2 className="w-6 h-6" />,
      label: "Heading 2",
      component: {
        id: makeId(),
        type: "h2",
        name: "Heading 2",
        parentId: null,
        children: [],
        content: "New Heading 2",
        styles: { fontSize: "28px", fontWeight: "600", color: "#1f2937", marginBottom: "12px" },
      },
      group: "typography",
    },
    {
      icon: <Heading3 className="w-6 h-6" />,
      label: "Heading 3",
      component: {
        id: makeId(),
        type: "h3",
        name: "Heading 3",
        parentId: null,
        children: [],
        content: "New Heading 3",
        styles: { fontSize: "22px", fontWeight: "600", color: "#1f2937", marginBottom: "8px" },
      },
      group: "typography",
    },
    {
      icon: <Heading4 className="w-6 h-6" />,
      label: "Heading 4",
      component: {
        id: makeId(),
        type: "h4",
        name: "Heading 4",
        parentId: null,
        children: [],
        content: "New Heading 4",
        styles: { fontSize: "18px", fontWeight: "600", color: "#1f2937", marginBottom: "8px" },
      },
      group: "typography",
    },
    {
      icon: <Heading5 className="w-6 h-6" />,
      label: "Heading 5",
      component: {
        id: makeId(),
        type: "h5",
        name: "Heading 5",
        parentId: null,
        children: [],
        content: "New Heading 5",
        styles: { fontSize: "16px", fontWeight: "600", color: "#1f2937", marginBottom: "6px" },
      },
      group: "typography",
    },
    {
      icon: <Heading6 className="w-6 h-6" />,
      label: "Heading 6",
      component: {
        id: makeId(),
        type: "h6",
        name: "Heading 6",
        parentId: null,
        children: [],
        content: "New Heading 6",
        styles: { fontSize: "14px", fontWeight: "600", color: "#1f2937", marginBottom: "6px" },
      },
      group: "typography",
    },
    {
      icon: <AlignLeft className="w-6 h-6" />,
      label: "Text",
      component: {
        id: makeId(),
        type: "text",
        name: "Text",
        parentId: null,
        children: [],
        content: "Hello!",
        styles: { fontSize: "16px", color: "#4b5563", lineHeight: "1.6" },
      },
      group: "typography",
    },
    {
      icon: <SquareDashed className="w-6 h-6" />,
      label: "Container",
      component: {
        id: makeId(),
        type: "container",
        name: "Container",
        parentId: null,
        children: [],
        styles: {
          position: "relative",
          maxWidth: "940px",
          height: "75px",
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
        id: makeId(),
        type: "section",
        name: "Section",
        parentId: "__body",
        children: [],
        styles: {
          width: "100%",
          height: "75px",
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
      icon: <Columns2 className="w-6 h-6" />,
      label: "Column",
      component: {
        id: makeId(),
        type: "column",
        name: "Column",
        parentId: null,
        children: [],
        styles: {
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          flex: "1",
          minWidth: "150px",
          backgroundColor: "transparent",
        },

      },
      group: "layout",
    },
    {
      icon: <Frame className="w-6 h-6" />,
      label: "Form",
      component: {
        id: makeId(),
        type: "form",
        name: "Form",
        parentId: null,
        children: [],
        styles: {
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "100%",
          padding: "20px",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        },
      },
      group: "forms",
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
        id: makeId(),
        type: "image",
        name: "Image",
        parentId: null,
        children: [],
        styles: { width: "100%", height: "auto", objectFit: "contain" },
        attributes: { src: "/image-placeholder.png" },
      },
      group: "media",
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
        id: makeId(),
        type: "link",
        name: "Link",
        parentId: null,
        children: [],
        content: "New Link",
        styles: { fontSize: "16px", color: "#4b5563", lineHeight: "1.6" },
        attributes: { href: "#" },
      },
      group: "typography",
    },
    {
      icon: (
        <Component
          strokeWidth={1.6}
          className="w-6 h-6"
        />
      ),
      label: "Button",
      component: {
        id: makeId(),
        type: "button",
        name: "Button",
        parentId: null,
        children: [],
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
      group: "forms",
    },
    {
      icon: <Video className="w-6 h-6" />,
      label: "Video",
      component: {
        id: makeId(),
        type: "video",
        name: "Video",
        parentId: null,
        children: [],
        styles: { width: "100%", height: "auto", aspectRatio: "16/9" },
        attributes: { src: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4", controls: "true" },
      },
      group: "media",
    },
    {
      icon: <Type className="w-6 h-6" />,
      label: "Input",
      component: {
        id: makeId(),
        type: "input",
        name: "Input",
        parentId: null,
        children: [],
        styles: {
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          backgroundColor: "#ffffff",
          color: "#4b5563",
        },
        attributes: { placeholder: "Enter text...", type: "text" },
      },
      group: "forms",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      label: "Textarea",
      component: {
        id: makeId(),
        type: "textarea",
        name: "Textarea",
        parentId: null,
        children: [],
        styles: {
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          backgroundColor: "#ffffff",
          minHeight: "80px",
        },
        attributes: { placeholder: "Enter description..." },
      },
      group: "forms",
    },
    {
      icon: <CheckSquare className="w-6 h-6" />,
      label: "Checkbox",
      component: {
        id: makeId(),
        type: "checkbox",
        name: "Checkbox",
        parentId: null,
        children: [],
        styles: { width: "16px", height: "16px", cursor: "pointer" },
        attributes: { type: "checkbox" },
      },
      group: "forms",
    },
    {
      icon: <List className="w-6 h-6" />,
      label: "Select",
      component: {
        id: makeId(),
        type: "select",
        name: "Select",
        parentId: null,
        children: [],
        styles: {
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          backgroundColor: "#ffffff",
        },
        attributes: {},
      },
      group: "forms",
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
      defaultValue={["Layout", "Typography", "Media", "Forms", "Components"]}
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
        value="Typography"
        className=" py-0 border-b-[1px] border-main-black"
      >
        <AccordionTrigger className="!no-underline">Typography</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-3">
          {elements
            .filter((element) => element.group === "typography")
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
        value="Media"
        className=" py-0 border-b-[1px] border-main-black"
      >
        <AccordionTrigger className="!no-underline">Media</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-3">
          {elements
            .filter((element) => element.group === "media")
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
        value="Forms"
        className=" py-0 border-b-[1px] border-main-black"
      >
        <AccordionTrigger className="!no-underline">Forms</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-3">
          {elements
            .filter((element) => element.group === "forms")
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
