"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { Heart, HeartHandshake, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sign_Out } from "../../../../../server/auth";
import VerifyBtn from "@/components/buttons/VerifyBtn";
import { auth } from "../../../../../auth";
import { useSession } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  margin?: string;
  size: string;
  includeInfo?: boolean;
};

const UserBtn = ({ children, className, margin, size, includeInfo = false }: Props) => {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={!!!session?.user}
        asChild
      >
        <div className="flex gap-2 items-center cursor-pointer">
          <button
            aria-label={"User profile"}
            className={clsx(className, " border-none outline-none", size)}
          >
            {children ? (
              children
            ) : (
              <div className={`rounded-full overflow-hidden ${size}`}>
                <Image
                  alt="profile-image"
                  // @ts-ignore: Ignore type error for role
                  src={session?.user?.avatarUrl || "/avater.svg"}
                  className="w-full h-full"
                  width={100}
                  height={100}
                />
              </div>
            )}
          </button>
          {includeInfo && <div>
            <h1 className=" font-light text-sm opacity-80 leading-snug">{session?.user?.name}</h1>
            <p className=" font-thin opacity-50 text-xs">{session?.user?.email}</p>
          </div>}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={clsx(margin, "bg-zinc-900 rounded-xl p-2")}>
        <DropdownMenuLabel className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="flex items-center justify-center rounded-full">
              <Image
                alt="user-image"
                className="w-8 h-8  rounded-full"
                // @ts-ignore: Ignore type error for role
                src={session?.user?.avatarUrl || "/avater.svg"}
                width={80}
                height={80}
              />
            </div>
            <div>
              <h1 className=" font-light text-base leading-snug">{session?.user?.name}</h1>
              <p className=" font-thin opacity-50 text-xs">{session?.user?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link
            href="/saas/profile"
            className=""
          >
            <DropdownMenuItem className="mt-3 opacity-50 rounded-xl p-1 flex gap-0">
              <div className=" h-10 w-10 flex items-center justify-center mr-4">
                <Settings size={16} />
              </div>
              <p>
                Profile
              </p>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="mb-3 opacity-50 p-1">
            <form
              action={Sign_Out}
              className="w-full"
            >
              <button
                className="w-full flex items-center"
                type="submit"
              >
                <div className=" h-10 w-10 flex items-center justify-center mr-4">
                  <LogOut size={16} />
                </div>
                <p>Log Out</p>
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <p className=" text-xs font-thin opacity-20 p-1">© Powered by azeorex.com</p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBtn;
