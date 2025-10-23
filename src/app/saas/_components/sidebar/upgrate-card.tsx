import React from "react";

const UpgrateCard = ({ credits }: { credits: number }) => {
  if (credits <= 1000) {
    return (
      <div className="border rounded-xl mb-4 dark:border-zinc-800">
        <div className="p-2.5 pb-0 h-24 bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))] rounded-t-xl text-sm">
          <div className="bg-[#F1F2F6] dark:bg-zinc-800 p-3 h-full rounded-t-[10px]">
            <div className="text-xs  flex justify-between items-center dark:text-zinc-200">
              <p>Credits left</p>
              <span className="bg-[#D1D6F2] text-xs dark:bg-zinc-700  px-2 py-0.5 text-[#4964f9] dark:text-blue-400 rounded-full">{credits}/1000</span>
            </div>
            <div className="h-1.5 bg-[#D1D6F2] dark:bg-zinc-700 rounded-full mt-2.5" />
            <div className="h-1.5 bg-[#bfc8fb] dark:bg-zinc-600 rounded-full w-[80%] mt-2" />
            <div className="h-1.5 bg-[#c3cbfc] dark:bg-zinc-500 rounded-full w-[90%] mt-2" />
          </div>
        </div>
        <div className="p-3">
          <p className="text-xs  mb-2 dark:text-zinc-200">🚀 Upgrade to Smart AI</p>
          <p className="text-xs opacity-60 dark:text-zinc-400">Unlock all the features include AI and more</p>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="border rounded-xl mb-4 dark:border-zinc-800">
          <div className="p-2.5 pb-0 h-24 bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))] rounded-t-xl text-sm">
            <div className="bg-zinc-800 p-3 h-full rounded-t-[10px]">
              <div className="text-xs  flex justify-between items-center dark:text-zinc-200">
                {/* TODO: Add Plan Name using webhook */}
                {/* <p>Basic Plane</p>*/}
                Your Credits
                <span className="bg-[#D1D6F2] text-xs dark:bg-zinc-700  px-2 py-1 pl-1 text-[#4964f9] dark:text-blue-400 rounded-full">🪙 {credits}</span>
              </div>
              <div className="h-1.5 bg-zinc-700 rounded-full animate-pulse mt-2.5" />
              <div className="h-1.5 bg-zinc-600 rounded-full animate-pulse w-[80%] mt-2" />
              <div className="h-1.5 bg-zinc-500/80 rounded-full animate-pulse w-[90%] mt-2" />
            </div>
          </div>
          <div className="p-3">
            <p className="text-xs  mb-2 dark:text-zinc-200">🚀 Your Plane is Active</p>
            <p className="text-xs opacity-60 dark:text-zinc-400">Now use all the features include AI and more</p>
          </div>
        </div>
      </>
    );
  }
};

export default UpgrateCard;
