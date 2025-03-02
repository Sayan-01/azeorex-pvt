import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  title: string;
  description?: string;
  updatedAt: any;
  id: string;
};

const Card = ({ title, description, updatedAt, id }: Props) => {
  const router = useRouter();
  const time = timeAgo(updatedAt);

  const handleDoubleClick = () => {
    router.push(`/saas/projects/${id}`);
  };

  return (
    <Link href={`/saas/projects/${id}`}>
      <div
        className="overflow-hidden rounded-2xl "
        // onDoubleClick={handleDoubleClick}
      >
        <Image
          className="bg-[#191919] hover:border-blue-500/80 w-full object-cover duration-200 rounded-2xl border-2 aspect-[4/2.8]"
          width={600}
          height={600}
          src={"/funnel-placeholder.svg"}
          alt="image-placeholder"
        />
        <div className="p-3 pt-2">
          <h3 className="md:text-[14px] sm:text-[16px] text-[18px] text-zinc-300/90 -mb-[1px]">{String(title).charAt(0).toUpperCase() + String(title).slice(1)}</h3>
          <p className="md:text-[13px] text-[15px] text-zinc-500">Edited {time}.</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
