import { Box, CircleFadingPlus, Sparkles } from "lucide-react";
import React from "react";

const EmptyStatefunnel = ({className}:{className?: string}) => {
  return (
    <div className="flex flex-col gap-1 items-center justify-center sm:my-14 my-10">
      <h3 className="text-lg font-semibold mb-2">No project found</h3>
      <p className="text-zinc-400 text-center  text-sm">
        This area light up with your projects for that first create <br></br>your project or plese try again.
      </p>
      <div className="max-w-[500px] w-[90%] my-4 mb-1 mx-auto bg-gradient-to-r from-transparent via-neutral-300 dark:via-sky-800 to-transparent h-[2px]" />
      
    </div>
  );
};

export default EmptyStatefunnel;
