import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chat } from "@/icons";
import { Ai } from "@/icons/ai";
import { Database } from "@/icons/database";
import { Plus2 } from "@/icons/plus2";
import { Stack } from "@/icons/stack";
import clsx from "clsx";

type Props = {
  className: string;
};

const TabList = (props: Props) => {
  return (
    <TabsList className={clsx("flex rounded-none border-main-az items-center  bg-transparent px-2 py-2.5 h-fit gap-2 absolute top-[0px] left-[54px] transition-all select-none", props.className)}>
      <TabsTrigger
        value="Chats"
        className="h-7 pl-[6px] pr-1.5 text-[12px] data-[state=active]:bg-zinc-700 data-[state=active]:opacity-90 data-[state=active]:mx-1 opacity-40 text-white gap-1.5 data-[state=active]:rounded-md"
      >
        <Chat /> Chats
      </TabsTrigger>
      <TabsTrigger
        value="Components"
        className="h-7 pl-[6px] pr-1.5 text-[12px] data-[state=active]:bg-zinc-700 data-[state=active]:opacity-90 data-[state=active]:mx-1 opacity-40 text-white gap-1.5 data-[state=active]:rounded-md"
      >
        <Plus2 /> Insert
      </TabsTrigger>

      <TabsTrigger
        value="Layers"
        className="h-7 pl-[6px] pr-1.5 text-[12px] data-[state=active]:bg-zinc-700 data-[state=active]:opacity-90 data-[state=active]:mx-1 opacity-40 text-white gap-1.5 data-[state=active]:rounded-md"
      >
        <Stack /> Layers
      </TabsTrigger>
      <TabsTrigger
        value="Media"
        className="h-7 pl-[6px] pr-1.5 text-[12px] data-[state=active]:bg-zinc-700 data-[state=active]:opacity-90 data-[state=active]:mx-1 opacity-40 text-white gap-1.5 data-[state=active]:rounded-md"
      >
        <Database /> Storage
      </TabsTrigger>

      <TabsTrigger
        value="AiPoward"
        className="h-7 pl-[6px] pr-1.5 text-[12px] data-[state=active]:bg-zinc-700 data-[state=active]:opacity-90 data-[state=active]:mx-1 opacity-40 text-white gap-1.5 data-[state=active]:rounded-md"
      >
        <Ai /> Ai Components
      </TabsTrigger>
    </TabsList>
  );
};

export default TabList;
