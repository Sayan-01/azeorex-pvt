"use client";
import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EllipsisVertical, ExternalLink, MoveRight } from "lucide-react";
import DeleteButton from "@/components/buttons/DeleteButton";
import { deleteProject } from "@/lib/queries";
import { revalidatePath } from "next/cache";

type Props = {
  name: string;
  description?: string;
  updatedAt: any;
  id: string;
  subDomainName: string;
  favicon: string;
};

const Card = ({ name, description, updatedAt, id, subDomainName, favicon }: Props) => {
  const time = timeAgo(updatedAt);

  return (
    <div className="overflow-hidde rounded-2xl group">
      {/* <Link href={`/saas/projects/${id}`}>
        <Image
          className="bg-[#191919] hover:border-blue-500/80 w-full object-cover duration-200 rounded-2xl border-2 aspect-[3/1.9]"
          width={600}
          height={600}
          src={"/funnel-placeholder.svg"}
          alt="image-placeholder"
        />
      </Link> */}

      {/* <div className="p-3 pt-2 pb-0">
          <h3 className="text-[14px] text-white -mb-[1px]">{String(name).charAt(0).toUpperCase() + String(name).slice(1)}</h3>
          <p className="text-[13px] text-zinc-500">Edited {time}.</p>
        </div> */}

      {/* <div className="pt-[12px] relative flex items-start  gap-3  w-full">
        <div className={"flex items-center gap-1 md:text-xs text-sm backdrop-blur-lg w-10 h-9 rounded-full items-right justify-center mt-1"}>
          <Image
            src={favicon || "/azeorex.png"}
            width={200}
            height={200}
            className="w-9 h-9  rounded-full"
            alt="profile img"
          />
        </div>

        <div className=" -mb-[1px] w-[90%] ">
          <h2 className="text-[15px] title_line text-white mb-0.5">{String(name).charAt(0).toUpperCase() + String(name).slice(1)}</h2>
          <div className="md:text-xs text-[13px] gap-3 text-zinc-300/90 flex items-center font-[600]">
            <span className="flex items-center gap-1 text-[#7e6cc5]">Edited {time}.</span>
          </div>
        </div>
        <MoreButton projectId={id} />
      </div> */}
      <div className="overflow-clip  p-2 pb-2.5">
        <Link
          href={`/saas/projects/${id}`}
          className="relative group"
        >
          <div className="cursor-pointer w-full bg-[#202124] rounded-[18px] p-2 border-2 border-[#202124] group-hover:border-blue-500">
            <Image
              className="bg-[#191919]  hover: w-full object-cover duration-200 rounded-xl  aspect-[3/1.9]"
              width={600}
              height={600}
              src={"/funnel-page-placeholder.svg"}
              alt="image-placeholder"
            />
          </div>
          <div className=" absolute w-full h-full top-0 left-0 text-blue-400 opacity-0  group-hover:opacity-80 transition-all duration-100 rounded-[15px] text-sm px-3 pr-1 py-1 bg-white/10  flex items-center justify-center gap-1">
            <div className="px-4 py-2 bg-white/90 flex items-center justify-center gap-2 rounded-full font-medium">
              Edit the website
              <MoveRight
                strokeWidth={1.7}
                size={18}
              />
            </div>
          </div>
        </Link>

        <div className="pt-[12px] relative flex items-start  gap-3  w-full">
          <div className={"flex items-center gap-1 md:text-xs text-sm backdrop-blur-lg w-10 h-9 rounded-full items-right justify-center mt-1"}>
            <Image
              src={favicon || "/azeorex.png"}
              width={200}
              height={200}
              className="w-9 h-9  rounded-full"
              alt="profile img"
            />
          </div>

          <div className=" -mb-[1px] w-[90%] ">
            <h2 className="text-[15px] title_line text-white mb-0.5">{String(name).charAt(0).toUpperCase() + String(name).slice(1)}</h2>
            {/* <p className="text-[13px] title_line text-gray-400 leading-tight font-light mb-[7px]  ">{description}</p> */}
            <div className="md:text-xs text-[13px] gap-3 text-zinc-300/90 flex items-center font-[600]">
              <span className="flex items-center gap-1 text-[#7e6cc5]">Edited {time}.</span>
              {/* <p className="text-[#8D5394]">56 reviews</p> */}
            </div>
          </div>
          <MoreButton projectId={id} />
        </div>
      </div>
    </div>
  );
};

export default Card;

const MoreButton = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deleteProject(projectId);
      setOpen(false);
      if (response) router.refresh();
    } catch (err) {}
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <EllipsisVertical
          onClick={() => setOpen(true)}
          size={12}
          className="absolute right-2 top-6 cursor-pointer opacity-40 "
        />
      </PopoverTrigger>
      <PopoverContent className="rounded-xl p-0 text-xs w-40 text-zinc-400 backdrop-blur flex flex-col  sm:mr-28 mr-10 cursor-pointer bg-zinc-950/30">
        {/* <div className="p-3 border-b">Id: {projectId}</div> */}
        <div className="p-3">Edit</div>
        <DeleteButton
          onClick={handleDelete}
          title="Delete Your comment"
          description="This action can’t be undone and your comment will be removed from this post permanently."
        >
          <div className="p-3 pt-0">Delete</div>
        </DeleteButton>
      </PopoverContent>
    </Popover>
  );
};
