import { Box, CircleFadingPlus, Sparkles } from "lucide-react";
import React from "react";

const EmptyStatefunnel = ({className}:{className?: string}) => {
  return (
    <div className="flex flex-col gap-1 items-center justify-center sm:my-14 my-10">
      <h3 className="text-lg font-semibold mb-2">No project found</h3>
      <p className="text-zinc-400 text-center md:text-base text-sm">
        This area light up with your projects for that first create <br></br>your project or plese try again.
      </p>
      <div className="max-w-[500px] w-[90%] my-3 mx-auto bg-gradient-to-r from-transparent via-neutral-300 dark:via-sky-800 to-transparent h-[2px]" />
      <div className="flex flex-wrap w-full items-center justify-center gap-4 mt-2 text-sm">
        <div className="bg-white/5 text-white/80 border cursor-pointer border-white/10 gap-3  h-10 px-3 flex items-center justify-center rounded-xl">
          <CircleFadingPlus size={16} /> <p>Create from scatch</p>
        </div>
        <div className="bg-white/5 text-white/80 border cursor-pointer border-white/10 gap-3  h-10 px-3 sm:flex items-center justify-center rounded-xl hidden">
          <Box size={16} /> <p>Start with templates</p>
        </div>
        <div className="bg-white/5 text-white/80 border cursor-pointer border-white/10 gap-3  h-10 px-3 sm:flex items-center justify-center rounded-xl hidden">
          <Sparkles size={16} /> <p>Create with Ai agent</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyStatefunnel;
