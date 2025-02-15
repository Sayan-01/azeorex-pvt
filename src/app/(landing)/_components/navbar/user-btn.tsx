import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { Heart, HeartHandshake, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sign_Out } from "../../../../../server/auth";
import VerifyBtn from "@/components/buttons/VerifyBtn";

type Props = {
  children: React.ReactNode;
  className?: string;
  imageUrl?: string;
  margin?: string;
  username: string;
  email: string;
  isVarified?: string;
  isAdmin?: string;
};

const UserBtn = async ({ children, className, imageUrl, margin, username, email, isVarified, isAdmin }: Props) => {
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
        <DropdownMenuLabel className="flex justify-between  items-center">
          <div className="flex gap-4 items-center">
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
          </div>
          {/* {isVarified ? (
            <>
              {isAdmin ? (
                <Image
                  alt="blue tick"
                  className="w-4 h-4"
                  src="/isAuth/bluetick.svg"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  alt="green tick"
                  className="w-4 h-4"
                  src="/isAuth/greentick.svg"
                  width={20}
                  height={20}
                />
              )}
            </>
          ) : (
            <VerifyBtn />
          )} */}
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
