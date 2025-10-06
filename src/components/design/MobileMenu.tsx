import React from "react";
import { auth } from "../../../auth";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { HiOutlineWindow } from "react-icons/hi2";
import VerifyBtn from "../buttons/VerifyBtn";
import { Sign_Out } from "../../../server/auth";
import { navMenu } from "@/constants/azeorex-landing-page";

const MobileMenu = async () => {
  const session = await auth();
  return (
    <div className="left-0 top-0 -z-10 pt-[72px] absolute p-6 bg-black/100 w-screen h-screen border-t">
      <div className="h-[1.2px] mb-5 bg-white/10" />

      {session ? (
        <>
          <Link
            href={`${process.env.NEXT_URL}/connection`}
            className="w-full "
          >
            <Button className=" rounded-lg w-full mb-4">Contact</Button>
          </Link>
          <form
            action={Sign_Out}
            className="w-full"
          >
            <Button
              className=" rounded-lg w-full bg-black border border-[#2c2c2c]"
              variant="outline"
              // loading="loading..."
            >
              Sign Out
            </Button>
          </form>
        </>
      ) : (
        <>
          <Link
            href={`${process.env.NEXT_URL}/auth/register`}
            className="w-full "
          >
            <Button className=" rounded-lg w-full mb-4">Sign Up</Button>
          </Link>
          <Link
            href={`${process.env.NEXT_URL}/auth/login`}
            className="w-full"
          >
            <Button
              className=" rounded-lg w-full bg-black border border-[#2c2c2c]"
              variant="outline"
            >
              Log In
            </Button>
          </Link>
        </>
      )}
      {session ? (
        <>
          <div className="mt-10 flex justify-between items-center">
            <p className=" opacity-35 max-w-[230px] ">{session?.user?.email}</p>
            {/* {session?.user?.isVarified ? (
              <>
                {session?.user?.isAdmin ? (
                  <div className="flex gap-2 items-center">
                    <Image
                    alt="blue tick"
                      className="w-5 h-5"
                      src="/isAuth/bluetick.svg"
                      width={20}
                      height={20}
                    />
                    <p className="text-[#52A8FF] text-sm font-semibold">Admin</p>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <Image
                    alt="green tick"
                      className="w-4 h-4"
                      src="/isAuth/greentick.svg"
                      width={18}
                      height={18}
                    />
                    <p className="text-[#08ea5b] text-sm font-semibold">User</p>
                  </div>
                )}
              </>
            ) : (
              <VerifyBtn />
            )} */}
          </div>
          <div className="h-[1.2px] my-5 bg-white/10" />
          <div className="flex items-center justify-between my-5">
            <p>
              <Link href={`${process.env.NEXT_URL}/settings`}>Account Setting</Link>
            </p>
            <HiOutlineCog6Tooth size={22} />
          </div>
          <div className="flex items-center justify-between my-5">
            <p>
              <Link href={"#"}
              // href={session?.user?.isAdmin ? `${process.env.NEXT_URL}/dashboard/admin` : `${process.env.NEXT_URL}/dashboard/client`}
              >User / Admin dashboard</Link>
            </p>
            <HiOutlineWindow size={22} />
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="h-[1.2px] mt-5 bg-white/10" />
      {navMenu.map((item) => {
        return (
          <div
            key={item.id}
            className="gap-6 my-5 opacity-50"
          >
            <Link href={item.url}>{item.title}</Link>
          </div>
        );
      })}
      <div className="h-[1.2px] bg-white/10 mb-5" />
      <div>
        <p className="h-full flex items-center justify-center text-[12px] opacity-50">© {new Date().getFullYear()}. All rights</p>
      </div>
    </div>
  );
};

export default MobileMenu;
