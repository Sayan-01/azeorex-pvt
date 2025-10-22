"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { EyeOff } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useEditor } from "../../../../providers/editor/editor-provider";

const Editor = ({ code, isLive }: { code: string; isLive?: boolean }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { dispatch, state } = useEditor();

  const handleUnpreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.11.2/lottie.min.js"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
            <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
            <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/dist/tippy.css" />
            <script src="https://unpkg.com/@popperjs/core@2"></script>
            <script src="https://unpkg.com/tippy.js@6"></script>
          </head>
          <body>
            ${code}
          </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [code]);

  useEffect(() => {
    if (isLive) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [isLive]);

  return (
    <div
      className={clsx("use-automation-zoom-in h-[calc(100%-40.8px)] overflow-y-auto mx-[240px] bg-[#272727] transition-all box !relative p-3 pb-[19px]", {
        "!p-0 !mr-0 !mx-0 h-full ": state.editor.previewMode === true || state.editor.liveMode === true,
        "!w-[850px]": state.editor.device === "Tablet",
        "!w-[420px]": state.editor.device === "Mobile",
        "w-full": state.editor.device === "Desktop",
        "border border-zinc-700 rounded-lg": state.editor.previewMode===false && state.editor.liveMode===false,
      })}
    >
      <iframe
        ref={iframeRef}
        className="w-full h-[100vh]  "
        sandbox="allow-scripts allow-same-origin"
      />
      {state.editor.previewMode && state.editor.liveMode && (
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}
    </div>
  );
};

export default Editor;
