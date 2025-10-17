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
    <div className="overflow-hidde rounded-2xl group cursor-pointer">
      <div className="overflow-clip border-2 border-[#2e2e30]/90 rounded-[16px] group-hover:border-blue-500">
        <Link
          href={`/saas/projects/${id}`}
          className="relative group"
        >
          <div className="cursor-pointer w-full h-full bg-[#2B2B2D]">
            <Image
              className="border-b-2 border-[#2e2e30]/90 group-hover:border-blue-500 w-full object-cover duration-100 h-[143px]"
              width={1000}
              height={1000}
              src={"/funnel-page-placeholder-2.svg"}
              alt="image-placeholder"
            />
          </div>
          <div className=" absolute w-full h-full top-0 left-0 text-blue-400 opacity-0  group-hover:opacity-80 transition-all duration-300 rounded-t-[15px] text-sm px-3 pr-1 py-1 bg-white/10  flex items-center justify-center gap-1">
            <div className="px-4 py-2 bg-white/90 flex items-center justify-center gap-2 rounded-full font-medium">
              Edit the website
              <MoveRight
                strokeWidth={1.7}
                size={18}
              />
            </div>
          </div>
        </Link>

        <div className="p-[12px] relative flex items-start  gap-3 bg-[#262628]/60 w-full">
          <div className=" -mb-[1px] w-[90%] ">
            <h2 className="text-[15px] title_line text-white/90 mb-0.5">{String(name).charAt(0).toUpperCase() + String(name).slice(1)}</h2>
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
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteProject(projectId);
      setOpen(false);
      if (response) router.refresh();
    } catch (err) {
      setLoading(false);
    }
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
      <PopoverContent className="rounded-xl p-0 text-xs w-40 text-zinc-400 flex flex-col  sm:mr-32 mr-10 cursor-pointer bg-zinc-900">
        {/* <div className="p-3 border-b">Id: {projectId}</div> */}
        <div className="p-3">Edit</div>
        <DeleteButton
          onClick={handleDelete}
          title="Delete Your comment"
          description="This action can’t be undone and your comment will be removed from this post permanently."
          loading={loading}
        >
          <div className="p-3 pt-0 w-full">Delete</div>
        </DeleteButton>
      </PopoverContent>
    </Popover>
  );
};
