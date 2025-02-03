import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sign_Out } from "../../../../../server/auth";

type Props = {
  children: React.ReactNode;
  className?: string;
  imageUrl?: string;
  margin?: string;
  username: string
  email: string
};


const UserBtn = async ({ children, className, imageUrl, margin, username, email }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={"User profile"}
          className={clsx(className, " border-none outline-none")}
        >
          {children}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={margin}>
        <DropdownMenuLabel className="flex gap-4  items-center">
          <div className="flex items-center justify-center rounded-full">
            <Image
              alt="user-image"
              className="w-11 h-11  rounded-full"
              src={imageUrl || "/user.png"}
              width={80}
              height={80}
            />
          </div>
          <div>
            <h1 className=" font-light">{username}</h1>
            <p className=" font-thin opacity-50 text-xs">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link
            href="/settings"
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
