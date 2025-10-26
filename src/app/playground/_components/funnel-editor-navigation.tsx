"use client";
import { Loader } from "@/components/global/Loader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { upsertFunnelPageForProject } from "@/lib/queries";
import { FunnelPage } from "@prisma/client";
import clsx from "clsx";
import { ChevronLeft, DownloadIcon, EyeIcon, Monitor, Redo2, Smartphone, Tablet, Undo2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FocusEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import { DeviceTypes, useEditor } from "../../../../providers/editor/editor-provider";

type Props = {
  projectId: string;
  funnelPageDetails: FunnelPage;
  userId: string;
};

const FunnelEditorNavigation = ({ projectId, funnelPageDetails, userId }: Props) => {
  const router = useRouter();
  const [load, setLoade] = useState(false);
  const pathName = usePathname();
  const { state, dispatch } = useEditor();

  
  const handlePreviewClick = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  const handleOnSave = async () => {
    try {
      setLoade(true);

      console.log(state.html);

      const code = "```html\n" + state.html + "\n```";

      // await upsertFunnelPageForProject({ ...funnelPageDetails, content: code }, projectId);

      toast.success("✨ Changes saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("😫 Could not save editor");
    } finally {
      setLoade(false);
    }
  };

  return (
    <TooltipProvider>
      <nav className={clsx("border-b border-bor-editor flex items-center justify-between px-4 py-1 gap-2 transition-all bg-editor-bcgc ", { "!h-0 !p-0 !overflow-hidden": state.previewMode })}>
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
            value={state.device}
            onValueChange={(value) => {
              dispatch({
                type: "CHANGE_DEVICE",
                payload: { device: value as DeviceTypes },
              });
            }}
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent gap-0 h-fit">
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value="Desktop"
                    className="data-[state=active]:border w-8 h-8 p-0"
                  >
                    <Monitor
                      size={18}
                      strokeWidth={1.3}
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
                    value="Tablet"
                    className="w-8 h-8 p-0 data-[state=active]:border"
                  >
                    <Tablet
                      size={18}
                      strokeWidth={1.3}
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
                    value="Mobile"
                    className="w-8 h-8 p-0 data-[state=active]:bg-muted"
                  >
                    <Smartphone
                      size={18}
                      strokeWidth={1.3}
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
            onClick={handlePreviewClick}
          >
            <EyeIcon
              size={18}
              strokeWidth={1.3}
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
            onClick={handleOnSave}
          >
            {load ? (
              <>
                <Loader loading={load} />
              </>
            ) : (
              <DownloadIcon size={16} />
            )}
          </button>
          {/* )} */}
        </aside>
      </nav>
    </TooltipProvider>
  );
};

export default FunnelEditorNavigation;
