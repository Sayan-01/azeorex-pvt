"use client";
import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
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
    <div className="overflow-hidde rounded-2xl ">
      <Link href={`/saas/projects/${id}`}>
        <Image
          className="bg-[#191919] hover:border-blue-500/80 w-full object-cover duration-200 rounded-2xl border-2 aspect-[3/1.9]"
          width={600}
          height={600}
          src={"/funnel-placeholder.svg"}
          alt="image-placeholder"
        />
      </Link>
      {/* <div className="p-3 pt-2 pb-0">
          <h3 className="text-[14px] text-white -mb-[1px]">{String(name).charAt(0).toUpperCase() + String(name).slice(1)}</h3>
          <p className="text-[13px] text-zinc-500">Edited {time}.</p>
        </div> */}
      {/*//*/}
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
