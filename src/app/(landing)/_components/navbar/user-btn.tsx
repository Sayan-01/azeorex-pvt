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
};

const UserBtn = ({ children, className, margin, size }: Props) => {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={!!(!session?.user)}
        asChild
      >
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className={margin}>
        <DropdownMenuLabel className="flex justify-between  items-center">
          <div className="flex gap-4 items-center">
            <div className="flex items-center justify-center rounded-full">
              <Image
                alt="user-image"
                className="w-10 h-10  rounded-full"
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
            href="/user/settings"
            className=""
          >
            <DropdownMenuItem className="mt-3 opacity-50">
              <div className=" h-10 w-10 flex items-center justify-center mr-4">
                <Settings size={16} />
              </div>
              <p>Settings</p>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="mb-3 opacity-50">
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
        <p className=" text-xs font-thin opacity-20">© Powered by azeorex.com</p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBtn;
