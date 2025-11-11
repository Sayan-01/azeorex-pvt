"use client";
import { Loader } from "@/components/global/Loader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { upsertFunnelPageForProject } from "@/lib/queries";
import { FunnelPage } from "@prisma/client";
import clsx from "clsx";
import { ChevronLeft, Copy, DownloadIcon, EyeIcon, EyeOff, Monitor, Redo2, Smartphone, Tablet, Undo2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FocusEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import { useEditor } from "../../../../providers/editor/editor-provider";

type Props = {
  projectId: string;
  funnelPageDetails: FunnelPage;
  userId: string;
};

const FunnelEditorNavigation = ({ projectId, funnelPageDetails, userId }: Props) => {
  const { state, dispatch } = useEditor();
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  let flag = false;

  const undo = () => dispatch({ type: "UNDO" });
  const redo = () => dispatch({ type: "REDO" });
  const setDevice = (device: "Desktop" | "Tablet" | "Mobile") => {
    dispatch({ type: "SET_DEVICE", payload: { device } });
  };

  const handleSave = async () => {
    setLoading(true);
    const jsonOutput = JSON.stringify(state.elements, null, 2);
    try {
      const response = await upsertFunnelPageForProject(
        {
          ...funnelPageDetails,
          content: jsonOutput,
        },
        projectId
      );
      setLoading(false);
      toast.success("✨Saved Editor");
    } catch (e) {
      console.log(e);

      toast.error("😫Could not save editor");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(state.elements, null, 2));
    toast.success("✨Copied Editor");
  };
  return (
    <TooltipProvider>
      <nav
        className={clsx("border-b border-bor-editor flex items-center justify-between px-4 py-1 gap-2 transition-all bg-editor-bcgc relative z-[1010] ", {
          // "!h-0 !p-0 !overflow-hidden": state.previewMode,
        })}
      >
        <aside className="flex items-center gap-4 max-w-[260px] w-[300px] py-1.5">
          <Link
            href={`/saas/projects/${projectId}`}
            className="px-1.5 pl-1 flex gap-1 items-center bg-zinc-700 rounded-md h-7 w-max"
          >
            <ChevronLeft
              size={20}
              strokeWidth={1.1}
            />
          </Link>
        </aside>
        <aside>
          <Tabs
            defaultValue="Desktop"
            className="w-fit"
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent gap-0 h-fit">
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    onClick={() => setDevice("Desktop")}
                    value="Desktop"
                    className="data-[state=active]:border w-8 h-8 p-0"
                  >
                    <Monitor
                      size={18}
                      strokeWidth={1.5}
                    />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Desktop</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    onClick={() => setDevice("Tablet")}
                    value="Tablet"
                    className="w-8 h-8 p-0 data-[state=active]:border"
                  >
                    <Tablet
                      size={18}
                      strokeWidth={1.5}
                    />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tablet</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    onClick={() => setDevice("Mobile")}
                    value="Mobile"
                    className="w-8 h-8 p-0 data-[state=active]:bg-muted"
                  >
                    <Smartphone
                      size={18}
                      strokeWidth={1.5}
                    />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mobile</p>
                </TooltipContent>
              </Tooltip>
            </TabsList>
          </Tabs>
        </aside>
        <aside className="flex items-center gap-0">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-slate-800"
            onClick={() => dispatch({ type: "TOGGLE_PREVIEW_MODE" })}
          >
            {state.previewMode ? (
              <EyeOff
                size={18}
                strokeWidth={1.5}
              />
            ) : (
              <EyeIcon
                size={18}
                strokeWidth={1.5}
              />
            )}
          </Button>
          <Button
            disabled={state.historyIndex === 0}
            onClick={undo}
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-slate-800"
          >
            <Undo2
              size={18}
              strokeWidth={1.5}
            />
          </Button>
          <Button
            onClick={redo}
            disabled={state.historyIndex === state.history.length - 1}
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-slate-800 mr-4"
          >
            <Redo2
              size={18}
              strokeWidth={1.5}
            />
          </Button>
          <div className="flex flex-col item-center mr-4">
            <div className="flex flex-row text-sm items-center gap-4">
              Draft
              <Switch
                disabled
                defaultChecked={true}
              />
              Publish
            </div>
          </div>
          <button
            className="text-sm border-l-2 border-main-black pl-3"
            onClick={handleCopy}
            >
            <Copy
              size={16}
              strokeWidth={1.5}
            />
          </button>
          <button
            className="text-sm border-l-2 border-main-black pl-3"
            onClick={handleSave}
          >
            {loading ? (
              <>
                <Loader loading={loading} />
              </>
            ) : (
              <DownloadIcon size={16} />
            )}
          </button>
        </aside>
      </nav>
    </TooltipProvider>
  );
};

export default FunnelEditorNavigation;
