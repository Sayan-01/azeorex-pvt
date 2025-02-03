"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EditorElement, useEditor } from "../../../../../../../../../../../../providers/editor/editor-provider";
import clsx from "clsx";
import { BoxSelect, Columns2, Contact2, CreditCardIcon, ImageIcon, Link2Icon, TextSelect, TypeIcon, Youtube } from "lucide-react";
import React from "react";

type RecursiveAccordianItemProps = {
  element: EditorElement;
};

const RecursiveAccordianItem = (props: RecursiveAccordianItemProps) => {
  const { state, dispatch } = useEditor();

  const handleSelectElement = (e: React.MouseEvent, element: EditorElement) => {
    e.stopPropagation();

    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: { elementDetails: element },
    });
  };

  return Array.isArray(props.element.content) ? (
    !!props.element.content.length ? (
      <AccordionItem
        value={props.element.id}
        className={clsx("transition-all border-b-0 border-r-0 border-l-none border-main-black select-none hover:pb-0", { " pl-4 ": props.element.type !== "__body" })}
        onClick={(e) => handleSelectElement(e, props.element)}
        onMouseOver={(e) => handleSelectElement(e, props.element)}
      >
        <AccordionTrigger
          className={clsx("!no-underline p-2 pl-0 text-sm border-b-[1px]", {
            "bg-muted-foreground/20 rounded-lg": state.editor.selectedElement.id === props.element.id,
          })}
        >
          <div className="flex items-center gap-2 pl-4  text-xs">
            {props.element.type === "container" ? (
              <BoxSelect
                size={16}
                className="text-muted-foreground"
              />
            ) : props.element.type === "image" ? (
              <ImageIcon
                size={16}
                className="text-muted-foreground"
              />
            ) : props.element.type === "__body" ? (
              <BoxSelect
                size={16}
                className="text-muted-foreground"
              />
            ) : props.element.type === "contactForm" ? (
              <Contact2
                size={16}
                className="text-muted-foreground"
              />
            ) : props.element.type === "2Col" ? (
              <Columns2
                size={16}
                className="text-muted-foreground"
              />
            ) : props.element.type === "section" ? (
              <TextSelect
                size={16}
                className="text-muted-foreground peer"
              />
            ) : props.element.type === "paymentForm" ? (
              <CreditCardIcon
                size={16}
                className="text-muted-foreground"
              />
            ) : props.element.type === "text" ? (
              <TypeIcon
                // size={16}
                className="text-muted-foreground"
              />
            ) : props.element.type === "link" ? (
              <Link2Icon
                size={16}
                className="text-muted-foreground"
              />
            ) : props.element.type === "video" ? (
              <Youtube
                size={16}
                className="text-muted-foreground"
              />
            ) : null}
            <p className=" opacity-80">{props.element.name}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col pb-0">
          {Array.isArray(props.element.content) &&
            props.element.content.map((childElement) => (
              <RecursiveAccordianItem
                key={childElement.id}
                element={childElement}
              />
            ))}
        </AccordionContent>
      </AccordionItem>
    ) : (
      <div
        className={clsx("flex items-center gap-2 pl-4 ml-4  py-2 cursor-pointer text-xs border-b-[1px]", {
          "!ml-0": props.element.type === "__body",
          "bg-muted-foreground/20 rounded-lg": state.editor.selectedElement.id === props.element.id,
        })}
        onClick={(e) => handleSelectElement(e, props.element)}
        onMouseOver={(e) => handleSelectElement(e, props.element)}
      >
        {props.element.type === "container" ? (
          <BoxSelect
            size={16}
            className="text-muted-foreground"
          />
        ) : props.element.type === "image" ? (
          <ImageIcon
            size={16}
            className="text-muted-foreground"
          />
        ) : props.element.type === "__body" ? (
          <BoxSelect
            size={16}
            className="text-muted-foreground"
          />
        ) : props.element.type === "contactForm" ? (
          <Contact2
            size={16}
            className="text-muted-foreground"
          />
        ) : props.element.type === "2Col" ? (
          <Columns2
            size={16}
            className="text-muted-foreground"
          />
        ) : props.element.type === "section" ? (
          <TextSelect
            size={16}
            className="text-muted-foreground"
          />
        ) : props.element.type === "paymentForm" ? (
          <CreditCardIcon
            size={16}
            className="text-muted-foreground"
          />
        ) : props.element.type === "text" ? (
          <TypeIcon
            // size={16}
            className="text-muted-foreground"
          />
        ) : props.element.type === "link" ? (
          <Link2Icon
            size={16}
            className="text-muted-foreground"
          />
        ) : props.element.type === "video" ? (
          <Youtube
            size={16}
            className="text-muted-foreground"
          />
        ) : null}
        <p className=" opacity-80">{props.element.name}</p>
      </div>
    )
  ) : (
    <div
      className={clsx("!no-underline flex items-center gap-2 pl-4 ml-4  py-2 cursor-pointer text-xs border-b-[1px]", {
        "bg-muted-foreground/20 rounded-lg": state.editor.selectedElement.id === props.element.id,
      })}
      onClick={(e) => handleSelectElement(e, props.element)}
      onMouseOver={(e) => handleSelectElement(e, props.element)}
    >
      {props.element.type === "container" ? (
        <BoxSelect
          size={16}
          className="text-muted-foreground"
        />
      ) : props.element.type === "image" ? (
        <ImageIcon
          size={16}
          className="text-muted-foreground"
        />
      ) : props.element.type === "__body" ? (
        <BoxSelect
          size={16}
          className="text-muted-foreground"
        />
      ) : props.element.type === "contactForm" ? (
        <Contact2
          size={16}
          className="text-muted-foreground"
        />
      ) : props.element.type === "2Col" ? (
        <Columns2
          size={16}
          className="text-muted-foreground"
        />
      ) : props.element.type === "section" ? (
        <TextSelect
          size={16}
          className="text-muted-foreground"
        />
      ) : props.element.type === "paymentForm" ? (
        <CreditCardIcon
          size={16}
          className="text-muted-foreground"
        />
      ) : props.element.type === "text" ? (
        <TypeIcon
          size={16}
          className="text-muted-foreground"
        />
      ) : props.element.type === "link" ? (
        <Link2Icon
          size={16}
          className="text-muted-foreground"
        />
      ) : props.element.type === "video" ? (
        <Youtube
          size={16}
          className="text-muted-foreground"
        />
      ) : null}
      <p className=" opacity-80">{props.element.name}</p>
    </div>
  );
};

const LayersTab = () => {
  const { state } = useEditor();

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-3">
        Navigator
      </h3>
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["__body"]}
      >
        {state.editor.elements.map((childElement) => (
          <RecursiveAccordianItem
            key={childElement.id}
            element={childElement}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default LayersTab;
