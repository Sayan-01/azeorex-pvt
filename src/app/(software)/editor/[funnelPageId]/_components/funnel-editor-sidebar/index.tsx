"use client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import React from "react";
import TabList from "./tabs";
import MediaBucketTab from "./tabs/media-bucket-tab";
import ComponentsTab from "./tabs/components-tab";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import LayersTab from "./tabs/layers-tab";
import WarframeTab from "./tabs/warframe-tab";
import LayoutTab from "./tabs/Layout";
import AiTab from "./tabs/AI-tab";
import SettingsTab from "./tabs/settings-tab2";
import Pages from "./tabs/pages";
import Sayan from "./tabs/pages";

type Props = {
  agencyId: string;
  funnelId: string;
};

const FunnelEditorSidebar = ({ agencyId, funnelId }: Props) => {
  const { state } = useEditor();

  return (
    <>
      <Sheet
        open={true}
        modal={false}
      >
        <Tabs
          className="w-full h-full"
          defaultValue="Components"
        >
          <TabList className={clsx({ "-top-[44.8px]": state.editor.previewMode })} />
          <SheetContent
            showX={false}
            side="left"
            className={clsx("mt-[48.8px] h-full border-b border-main-black ml-[1px] w-[240px] z-[40] shadow-none p-0  bg-background transition-all  border-none  rounded-none select-none ", {
              hidden: state.editor.previewMode,
            })}
          >
            <div className="grid gap-4 h-full w-[240px] pb-12 overflow-auto overflow-x-hidden box bg-editor-bcgc border-r border-main-black">
              <TabsContent
                value="Components"
                className="p-4"
              >
                <Tabs defaultValue="Components">
                  <div className="flex items-center pb-4 border-b  border-main-black">
                    <TabsList className="w-full justify-between gap-2 p-[2px] h-[31px] rounded-lg bg-[#242424] ">
                      <TabsTrigger
                        value="Components"
                        className="w-full h-7 data-[state=active]:bg-zinc-700 editor_text"
                      >
                        Components
                      </TabsTrigger>
                      <TabsTrigger
                        value="Warframe"
                        className="w-full h-7 data-[state=active]:bg-zinc-700 editor_text"
                      >
                        Warframes
                      </TabsTrigger>
                      {/* <TabsTrigger
                        value="Pages"
                        className="w-full h-7 data-[state=active]:bg-zinc-700 editor_text"
                      >
                        Page
                      </TabsTrigger> */}
                    </TabsList>
                  </div>
                  <TabsContent value="Components">
                    <SheetHeader className="text-left pt-3  border-none">
                      <SheetTitle>Components</SheetTitle>
                      <SheetDescription>You can drag and drop components on the canvas</SheetDescription>
                    </SheetHeader>
                    <ComponentsTab />
                  </TabsContent>
                  <TabsContent value="Warframe">
                    <SheetHeader className="text-left py-3 ">
                      <SheetTitle>Warframe</SheetTitle>
                      <SheetDescription>You can drag and drop components on the canvas</SheetDescription>
                    </SheetHeader>
                    <WarframeTab />
                  </TabsContent>
                  {/* <TabsContent value="Pages">
                    <SheetHeader className="text-left py-3 ">
                      <SheetTitle>Pages</SheetTitle>
                      <SheetDescription>All pages of your website</SheetDescription>
                    </SheetHeader>
                    <Sayan funnelId={funnelId}/>
                  </TabsContent> */}
                </Tabs>
              </TabsContent>
              <TabsContent value="Layers">
                <LayersTab />
              </TabsContent>
              <TabsContent value="Media">
                <MediaBucketTab agencyId={agencyId} />
              </TabsContent>
              <TabsContent value="Layout">
                <LayoutTab />
              </TabsContent>
              <TabsContent value="CMS">
                <LayoutTab />
              </TabsContent>
              <TabsContent value="AiPoward">
                <AiTab />
              </TabsContent>
            </div>
          </SheetContent>
        </Tabs>
      </Sheet>
      <Sheet
        open={true}
        modal={false}
      >
        <Tabs
          className="w-full"
          defaultValue="Settings"
        >
          <SheetContent
            showX={false}
            side="right"
            className={clsx("mt-[48.8px] mr-[1px] w-[240px] z-[40] shadow-none p-0  bg-background h-full transition-all overflow-hidden border-none  rounded-none", {
              hidden: state.editor.previewMode,
            })}
          >
            <div className="grid gap-4 h-full w-[240px] pb-4 overflow-auto overflow-x-hidden box border-l border-main-black">
              <TabsContent value="Settings">
                <SettingsTab />
              </TabsContent>
            </div>
          </SheetContent>
        </Tabs>
      </Sheet>
    </>
  );
};

export default FunnelEditorSidebar;
