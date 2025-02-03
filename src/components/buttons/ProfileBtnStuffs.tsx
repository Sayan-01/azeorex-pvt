import React from "react";
import { Button } from "../ui/button";
import { auth } from "../../../auth";
import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { HiOutlineCog6Tooth, HiOutlineHeart, HiOutlineHome, HiOutlineWindow } from "react-icons/hi2";
import VerifyBtn from "./VerifyBtn";
import { Sign_Out } from "../../../server/auth";

const ProfileBtnStuffs = async ({ className, children }) => {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={"User profile"}
          className={className}
        >
          {children}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2 rounded-xl">
        <DropdownMenuLabel className="flex justify-between items-center">
          <p>My Account</p>
          {session?.user?.isVarified ? (
            <>
              {session?.user?.isAdmin ? (
                <Image
                alt="blue tick"
                  className="w-4 h-4"
                  src="/isAuth/bluetick.svg"
                  width={20}
                  height={20}
                />
              ) : (
                <Image alt="green tick"
                  className="w-4 h-4"
                  src="/isAuth/greentick.svg"
                  width={20}
                  height={20}
                />
              )}
            </>
          ) : (
            <VerifyBtn />
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link
            href="/settings"
            className="opacity-70"
          >
            <DropdownMenuItem>
              Account
              <DropdownMenuShortcut>
                <HiOutlineCog6Tooth size={17} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link
            href="mailto:azeorex01@gmail.com"
            className="opacity-70"
          >
            <DropdownMenuItem>
              Support
              <DropdownMenuShortcut>
                <HiOutlineHeart size={17} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <Link
            href="/"
            className="opacity-70"
          >
            <DropdownMenuItem>
              Home
              <DropdownMenuShortcut>
                <HiOutlineHome size={17} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {session ? (
            <>
              <DropdownMenuItem className="p-0">
                <Link
                  href={`${process.env.NEXT_URL}/dashboard/${session?.user?.isAdmin ? "admin" : "client"}`}
                  className="w-full "
                >
                  <Button
                    className="w-full text-sm rounded-lg"
                    size="sm"
                  >
                    Dashboard
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0 mt-2">
                <form
                  action={Sign_Out}
                  className="w-full"
                >
                  <Button
                    className="w-full text-sm rounded-lg"
                    type="submit"
                    size="sm"
                  >
                    Sign out
                  </Button>
                </form>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem className="p-0">
                <Link
                  href={`${process.env.NEXT_URL}/auth/register`}
                  className="w-full "
                >
                  <Button
                    className="w-full text-sm rounded-lg"
                    size="sm"
                  >
                    Sign Up
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0 mt-2">
                <Link
                  href={`/auth/login`}
                  className="w-full"
                >
                  <Button
                    className="w-full text-sm rounded-lg"
                    type="submit"
                    size="sm"
                  >
                    Log In
                  </Button>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileBtnStuffs;
