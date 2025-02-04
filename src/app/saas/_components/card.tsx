import Image from "next/image";
import React from "react";

const Card = () => {
  return (
    <div className=" overflow-hidden rounded-2xl bg-[#202124]">
      <Image
        className="bg-[#191919] w-full object-cover duration-500 rounded-2xl border-2 aspect-[4/2.5] "
        width={600}
        height={600}
        src={"/funnel-placeholder.svg"}
        alt={`image-placeholder`}
      />
      <div className="p-3">
        <h3 className="text-xs text-zinc-300 mb-0.5">Untitled</h3>
        <p className="text-[11px] text-zinc-500">Edited 16 hours ago</p>
      </div>
    </div>
  );
};

export default Card;
