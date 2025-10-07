import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createWarframe, deleteWarframe, findWarframe } from "@/lib/queries";
import { Warframe } from "@/types/types";
import { Copy, PanelBottom, PanelTop, Rows2, Settings2, TextSelect, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useEditor } from "../../../../../../../../../providers/editor/editor-provider";
import { toast } from "sonner";

const LayoutTab = () => {
  return (
    <div className=" p-4">
      <div className="border-b border-main-black pb-3">
        <h3 className="text-lg font-semibold mb-3">Starter</h3>
        <p className="text-sm text-muted-foreground mb-1">You can drag and drop components on the canvas</p>
      </div>
      <div className="border-b border-main-black pb-3">
        <p className="editor_text ml-2 my-4">Basics</p>
        <Tabs
          defaultValue=""
          className="w-full"
        >
          <TabsList className="w-full flex flex-col h-max bg-transparent p-0 gap-2">
            <TabsTrigger
              value="navigation"
              className="w-full p-0 data-[state=active]:bg-[#222222] hover:bg-[#222222] rounded-xl"
            >
              <div className="flex gap-2 p-2  rounded-xl items-center editor_text w-full">
                <div className="p-2 bg-[#333333] rounded-lg">
                  <PanelTop
                    size={20}
                    strokeWidth={2}
                  />
                </div>
                Navigation
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="sections"
              className="w-full p-0 data-[state=active]:bg-[#222222] hover:bg-[#222222] rounded-xl"
            >
              <div className="flex gap-2 p-2  rounded-xl items-center editor_text w-full">
                <div className="p-2 bg-[#333333] rounded-lg">
                  <TextSelect
                    size={20}
                    strokeWidth={2}
                  />
                </div>
                Sections
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="menus"
              className="w-full p-0 data-[state=active]:bg-[#222222] hover:bg-[#222222] rounded-xl"
            >
              <div className="flex gap-2 p-2 rounded-xl items-center editor_text w-full">
                <div className="p-2 bg-[#333333] rounded-lg">
                  <Rows2
                    size={20}
                    strokeWidth={2}
                  />
                </div>
                Menus
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="footer"
              className="w-full p-0 data-[state=active]:bg-[#222222] hover:bg-[#222222] rounded-xl"
            >
              <div className="flex gap-2 p-2 rounded-xl items-center editor_text w-full">
                <div className="p-2 bg-[#333333] rounded-lg">
                  <PanelBottom
                    size={20}
                    strokeWidth={2}
                  />
                </div>
                Footer
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="navigation"
            className="bg-[#111111] border-r border-main-az p-3 absolute h-full w-full top-0 z-[1000] left-[240px]"
          >
            <Body value="navigation" />
          </TabsContent>
          <TabsContent
            value="sections"
            className="bg-[#111111] border-r border-main-az p-3 absolute h-full w-full top-0 z-[1000] left-[240px]"
          >
            <Body value="sections" />
          </TabsContent>
          <TabsContent
            value="menus"
            className="bg-[#111111] border-r border-main-az p-3 absolute h-full w-full top-0 z-[1000] left-[240px]"
          >
            <Body value="menus" />
          </TabsContent>
          <TabsContent
            value="footer"
            className="bg-[#111111] border-r border-main-az p-3 absolute h-full w-full top-0 z-[1000] left-[240px]"
          >
            <Body value="footer" />
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <p className="ml-2 my-4 editor_text">Advanced</p>
        <Button
          size="sm"
          className="bg-[#22dd6626] hover:bg-[#22dd6626]  text-[#21DB66] w-full editor_text"
        >
          Comming soon
        </Button>
      </div>
    </div>
  );
};

const Body = ({ value }: { value: string }) => {
  const { state } = useEditor();
  const [loading, setLoading] = useState(true);

  const [warframeName, setWarframeName] = useState("");
  const [warframeImage, setWarframeImage] = useState("");
  const [components, setComponents] = useState<Warframe[]>([]);
  const handleCreateWarframe = async () => {
    await createWarframe({
      id: v4(),
      warframe_name: warframeName,
      warframe_image: warframeImage,
      warframe: JSON.stringify(state.editor.selectedElement),
    });
    toast.success("Warframe created");
    setWarframeName("");
    setWarframeImage("");
  };

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const res = await findWarframe();
        setComponents(res);
      } catch (error) {
        console.error("Failed to fetch warframes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComponents();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex gap-3 flex-col">
          <div className=" w-full bg-[#202020c8] h-40 rounded-xl p-2 animate-pulse">
            <div className="w-full h-full bg-[#2f2f2f52] rounded-xl"></div>
          </div>
          <div className=" w-full bg-[#202020c8] h-40 rounded-xl p-2 animate-pulse">
            <div className="w-full h-full bg-[#2f2f2f52] rounded-xl"></div>
          </div>
          <div className=" w-full bg-[#202020c8] h-40 rounded-xl p-2 animate-pulse">
            <div className="w-full h-full bg-[#2f2f2f52] rounded-xl"></div>
          </div>
          <div className=" w-full bg-[#202020c8] h-40 rounded-xl p-2 animate-pulse">
            <div className="w-full h-full bg-[#2f2f2f52] rounded-xl"></div>
          </div>
        </div>
      ) : (
        <>
          {components
            .filter((element) => element.warframe_name === value)
            .map((element) => (
              <div
                key={element.id}
                id={element.id}
                onDragStart={(e) => {
                  e.dataTransfer.setData("componentType", element.warframe); //element.warframe 1 ta string
                }}
                draggable
                className="mb-2 rounded-md bg-zinc-800 editor_text p-2 px-3 h-20 flex items-center justify-center relative border-2 border-zinc-700 border-dashed"
              >
                <p>{element?.warframe_name}</p>
                <div className="absolute top-2 right-2 opacity-60 flex gap-1">
                  <div
                    className="flex gap-2"
                    onClick={() => {
                      navigator.clipboard.writeText(element.warframe);
                      toast.success("Copied Successfully");
                    }}
                  >
                    <Copy size={15} />
                  </div>
                  <button
                    onClick={async () => {
                      await deleteWarframe(element.id);
                      toast.success("Warframe deleted");
                    }}
                  >
                    <Trash2 size={15.5} />
                  </button>
                </div>
                <button className="absolute top-2 left-2 hidden opacity-60">
                  <Settings2 size={15} />
                </button>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default LayoutTab;
