"use client";
import { Loader } from "@/components/global/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/custom-input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { saveActivityLogsNotification, upsertFunnelPage } from "@/lib/queries";
import { FunnelPage } from "@prisma/client";
import clsx from "clsx";
import { ChevronDown, DownloadIcon, EyeIcon, Monitor, Redo2, Smartphone, Tablet, Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FocusEventHandler, useEffect, useState } from "react";
import { DeviceTypes, useEditor } from "../../../../../../../../../../providers/editor/editor-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Props = {
  funnelId: string;
  funnelPageDetails: FunnelPage;
  agencyId: string;
};

const FunnelEditorNavigation = ({ funnelId, funnelPageDetails, agencyId }: Props) => {
  const router = useRouter();
  const { state, dispatch } = useEditor();
  const [load, setLoade] = useState(false);
  const { toast } = useToast();
  const pathName = usePathname();

  useEffect(() => {
    dispatch({
      type: "SET_FUNNELPAGE_ID",
      payload: { funnelPageId: funnelPageDetails.id },
    });
  }, [funnelPageDetails]);

  const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.value === funnelPageDetails.name) return;
    if (event.target.value) {
      await upsertFunnelPage(
        agencyId,
        {
          id: funnelPageDetails.id,
          name: event.target.value,
          order: funnelPageDetails.order,
        },
        funnelId
      );

      toast({
        description: "✨Saved Funnel Page title",
      });
      router.refresh();
    } else {
      toast({
        description: "😫You need to have a title!",
      });
      event.target.value = funnelPageDetails.name;
    }
  };

  const handlePreviewClick = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };

  const handleOnSave = async () => {
    setLoade(true);
    const content = JSON.stringify(state.editor.elements);
    try {
      const response = await upsertFunnelPage(
        agencyId,
        {
          ...funnelPageDetails,
          content,
        },
        funnelId
      );
      await saveActivityLogsNotification({
        description: `Updated a funnel page | ${response?.name}`,
        agencyId: agencyId,
      });
      setLoade(false);
      toast({
        description: "✨Saved Editor",
      });
    } catch {
      toast({
        description: "😫Could not save editor",
      });
    }
  };

  return (
    <TooltipProvider>
      <nav className={clsx("border-b border-main-az flex items-center justify-between px-3 py-1 gap-2 transition-all bg-editor-bcgc ", { "!h-0 !p-0 !overflow-hidden": state.editor.previewMode })}>
        <aside className="flex items-center gap-4 max-w-[260px] w-[300px] py-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-1.5 flex gap-1 items-center bg-zinc-700 rounded-md h-7 w-max">
              {/* <Image
                src={"/az.svg"}
                alt="logo"
                width={24}
                height={24}
              /> */}
              <ChevronDown
                size={20}
                strokeWidth={1.1}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-4">
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex gap-4 ">
                  <Link href={`/agency/${agencyId}/funnels/${funnelId}`}>Azeorex</Link>
                  <div className="flex  w-full ">
                    <Input
                      defaultValue={funnelPageDetails.name}
                      className="h-7 -ml-2 mt-0 text-base bg-transparent opacity-60"
                      onBlur={handleOnBlurTitleChange}
                    />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </aside>
        <aside>
          <Tabs
            defaultValue="Desktop"
            className="w-fit"
            value={state.editor.device}
            onValueChange={(value) => {
              dispatch({
                type: "CHANGE_DEVICE",
                payload: { device: value as DeviceTypes },
              });
            }}
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent gap-0 h-fit">
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Desktop"
                    className="data-[state=active]:bg-muted w-8 h-8 p-0"
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
                <TooltipTrigger>
                  <TabsTrigger
                    value="Tablet"
                    className="w-8 h-8 p-0 data-[state=active]:bg-muted"
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
                <TooltipTrigger>
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
          <Button
            disabled={!(state.history.currentIndex > 0)}
            onClick={handleUndo}
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-slate-800"
          >
            <Undo2
              size={18}
              strokeWidth={1.3}
            />
          </Button>
          <Button
            disabled={!(state.history.currentIndex < state.history.history.length - 1)}
            onClick={handleRedo}
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-slate-800 mr-4"
          >
            <Redo2
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
            {/* <span className="text-muted-foreground text-sm">Last updated {funnelPageDetails.updatedAt.toLocaleDateString()}</span> */}
          </div>
          {/* {pathName === "/demo" ? (
            <button
              className="text-sm border-l-2 border-main-black pl-3"
              onClick={() => {
                toast({
                  description: "😫 It is just a demo",
                });
              }}
            >
              {load ? (
                <>
                  <Loader loading={load} />
                </>
              ) : (
                <DownloadIcon size={16} />
              )}
            </button>
          ) : ( */}
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
