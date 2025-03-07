import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  name: string;
  description?: string;
  updatedAt: any;
  id: string;
  subDomainName: string;
  favicon: string;
};

const Card = ({ name, description, updatedAt, id, subDomainName, favicon }: Props) => {
  const router = useRouter();
  const time = timeAgo(updatedAt);

  return (
    <Link href={`/saas/projects/${id}`}>
      <div className="overflow-hidden rounded-2xl ">
        <Image
          className="bg-[#191919] hover:border-blue-500/80 w-full object-cover duration-200 rounded-2xl border-2 aspect-[3/1.9]"
          width={600}
          height={600}
          src={"/funnel-placeholder.svg"}
          alt="image-placeholder"
        />
        {/* <div className="p-3 pt-2 pb-0">
          <h3 className="text-[14px] text-white -mb-[1px]">{String(name).charAt(0).toUpperCase() + String(name).slice(1)}</h3>
          <p className="text-[13px] text-zinc-500">Edited {time}.</p>
        </div> */}
        {/*//*/}
        <div className="pt-[12px] relative flex items-start  gap-3  w-full">
          <div className={"flex items-center gap-1 md:text-xs text-sm backdrop-blur-lg w-9 h-9 rounded-full items-right justify-center mt-1"}>
            <Image
              src={favicon || "/azeorex.png"}
              width={200}
              height={200}
              className="w-8 h-8  rounded-full"
              alt="profile img"
            />
          </div>

          <div className=" -mb-[1px] w-[90%]">
            <h2 className="text-[15px] title_line text-white mb-0.5">{String(name).charAt(0).toUpperCase() + String(name).slice(1)}</h2>
            {/* <p className="text-[13px] title_line text-gray-400 leading-tight font-light mb-[7px]  ">{description}</p> */}
            <div className="md:text-xs text-[13px] gap-3 text-zinc-300/90 flex items-center font-[600]">
              <span className="flex items-center gap-1 text-[#7e6cc5]">Edited {time}.</span>
              {/* <p className="text-[#8D5394]">56 reviews</p> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
