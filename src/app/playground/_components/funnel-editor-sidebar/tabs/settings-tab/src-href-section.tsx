import React, { useEffect, useState } from "react";
import { EditorElement } from "../../../../../../../providers/editor/editor-actions";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import { Input } from "@/components/ui/custom-input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Link } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SrcHrefSection = ({selectedElement}: {selectedElement: EditorElement}) => {
  const { updateElementAttribute } = useEditor();
  const [href, setHref] = useState("");
  const [src, setSrc] = useState("");

  const isLinkElement = selectedElement?.type === "a" || selectedElement?.type === "button";
  const isImageElement = selectedElement?.type === "img";
  const showAttributes = isLinkElement || isImageElement;

  useEffect(() => {
    if (!selectedElement) {
      setHref("");
      setSrc("");
      
      return;
    }

    setHref(selectedElement.attributes?.href || "");
    setSrc(selectedElement.attributes?.src || "");
  }, [selectedElement?.id, selectedElement?.attributes]);

  const updateHref = () => {
    if (!selectedElement) return;
    updateElementAttribute(selectedElement.id, "href", href);
  };

  const updateSrc = () => {
    if (!selectedElement) return;
    updateElementAttribute(selectedElement.id, "src", src);
  };

  const handleKeyPress = (e: any, updateFunction: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFunction();
    }
  };

if (!selectedElement) {
  return (
    <AccordionItem
      value="Attributes"
      className="px-3 py-0 border-none"
    >
      <AccordionTrigger className="!no-underline font-semibold">Attributes</AccordionTrigger>
      <AccordionContent>
        <div className="text-gray-500 text-xs text-center py-4">Select an element to manage attributes</div>
      </AccordionContent>
    </AccordionItem>
  );
}

if (!showAttributes) {
  return (
    <AccordionItem
      value="Attributes"
      className="px-3 py-0 border-none"
    >
      <AccordionTrigger className="!no-underline font-semibold">Attributes</AccordionTrigger>
      <AccordionContent>
        <div className="text-gray-500 text-xs text-center py-4">
          No attributes available for <span className="text-blue-400">&lt;{selectedElement.type}&gt;</span>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

return (
  <AccordionItem
    value="Attributes"
    className="px-3 py-0 border-none"
  >
    <AccordionTrigger className="!no-underline font-semibold">Attributes</AccordionTrigger>

    <AccordionContent className="flex flex-col gap-4">
      {/* Link Attributes (for <a> and <button>) */}
      {isLinkElement && (
        <>
          <div className="space-y-2">
            <label className="text-xs text-gray-400 flex items-center gap-1">
              <Link className="w-3 h-3" />
              Link URL (href)
            </label>
            <div className="flex gap-2">
              <Input
                className="h-[32px] flex-1"
                value={href}
                onChange={(e) => setHref(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, updateHref)}
                placeholder="https://example.com"
              />
              <Button
                className="h-[32px] px-3"
                type="button"
                onClick={updateHref}
              >
                Set
              </Button>
            </div>
          </div>

          
        </>
      )}

      {/* Image Attributes */}
      {isImageElement && (
        <>
          <div className="space-y-2">
            <label className="text-xs text-gray-400 flex items-center gap-1">
              <ImageIcon className="w-3 h-3" />
              Image URL (src)
            </label>
            <div className="flex gap-2">
              <Input
                className="h-[32px] flex-1"
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, updateSrc)}
                placeholder="https://example.com/image.jpg"
              />
              <Button
                className="h-[32px] px-3"
                type="button"
                onClick={updateSrc}
              >
                Set
              </Button>
            </div>
          </div>

          

          {/* Image Preview */}
          {src && (
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Preview</label>
              <div className="border border-gray-700 rounded p-2 bg-gray-800">
                <img
                  src={src}
                  alt={ "Preview"}
                  className="max-w-full h-auto max-h-[200px] object-contain mx-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23333' width='200' height='200'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EInvalid URL%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Helper text */}
      <p className="text-xs text-gray-500">Press Enter or click Set to apply changes</p>
    </AccordionContent>
  </AccordionItem>
);};

export default SrcHrefSection;
