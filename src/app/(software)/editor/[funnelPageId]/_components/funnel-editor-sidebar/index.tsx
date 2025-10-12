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
import AiTab from "./tabs/AI-tab";
import SettingsTab from "./tabs/settings-tab";
import Chats from "./tabs/chats";
// import LayoutTab from "./tabs/layout";


type Props = {
  userId: string;
  projectId: string;
  messages:{
    role: string;
    content: string;
  }[]
  sendMessage: any
  loading: boolean
};

const FunnelEditorSidebar = ({ userId, projectId, messages, sendMessage, loading }: Props) => {
  const { state, dispatch } = useEditor();

  return (
    <>
      <Sheet
        open={true}
        modal={false}
      >
        <Tabs
          className="w-full h-full"
          defaultValue="Chats"
        >
          <TabList className={clsx({ "-top-[44.8px]": state.editor.previewMode })} />
          <SheetContent
            showX={false}
            side="left"
            className={clsx("mt-[48.8px] h-[calc(100%)-170px] border-b border-main-black  w-[240px] z-[40] shadow-none p-0  bg-background transition-all  border-none  select-none", {
              hidden: state.editor.previewMode,
            })}
          >
            <div className="grid gap-4 h-full w-[240px]  overflow-auto box bg-editor-bcgc border-main-black">
              <TabsContent value="Chats">
                <Chats
                  messages={messages}
                  onSend={sendMessage}
                  loading={loading}
                />
              </TabsContent>
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
                    </TabsList>
                  </div>
                  <TabsContent value="Components">
                    <SheetHeader className="text-left pt-3  border-none p-0">
                      <SheetTitle className="text-[18px]">Components</SheetTitle>
                      <SheetDescription>You can drag and drop components on the canvas</SheetDescription>
                    </SheetHeader>
                    <ComponentsTab />
                  </TabsContent>
                  <TabsContent value="Warframe">
                    <SheetHeader className="text-left py-3 p-0">
                      <SheetTitle className="text-[18px]">Warframe</SheetTitle>
                      <SheetDescription>You can drag and drop components on the canvas</SheetDescription>
                    </SheetHeader>
                    <WarframeTab />
                  </TabsContent>
                </Tabs>
              </TabsContent>
              <TabsContent value="Layers">
                <LayersTab />
              </TabsContent>
              <TabsContent value="Media">
                <MediaBucketTab projectId={projectId} />
              </TabsContent>
              <TabsContent value="Layout">
                {/* <LayoutTab /> */}
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
          className="w-full h-full"
          defaultValue="Settings"
        >
          <SheetContent
            showX={false}
            side="right"
            className={clsx("mt-[48.8px] h-[calc(100%)-170px] w-[240px] z-[30] shadow-none p-0  bg-background  transition-all border-none  select-none ", {
              hidden: state.editor.previewMode,
            })}
          >
            <div className="grid gap-4 h-full w-[240px] overflow-auto overflow-x-hidden box">
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
