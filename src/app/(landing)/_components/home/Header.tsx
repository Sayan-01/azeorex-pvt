import React from "react";
import Image from "next/image";
import Link from "next/link";

import Wrapper from "@/components/design/Wrapper";
import Button from "@/components/buttons/Button";
import MobileMenuButton from "@/components/buttons/MobileMenuButton";
import MobileMenu from "@/components/design/MobileMenu";
import { auth } from "../../../../../auth";
import { navMenu } from "@/constants/azeorex-landing-page";
import { Compass } from "lucide-react";
import UserBtn from "../navbar/user-btn";

const Header = async () => {
  const session = await auth();
  return (
    <header>
      <div className="h-[2px] bg-bcgc"></div>
      <div className="fixed top-0 z-[100] backdrop-blur-md  sm:h-[95px] h-[75px] w-full">
        <Wrapper className="h-full">
          <div className="mx-auto my-auto max-w-screen-xl h-full">
            <div className="flex h-full items-center justify-between">
              <div className="md:flex md:items-center md:gap-12 w-[100px]">
                <Link
                  className=" flex items-center"
                  href="/"
                >
                  <Image
                    src="/logo.svg"
                    height={400}
                    width={400}
                    className="w-[132px]"
                    alt="logo"
                  />
                </Link>
              </div>

              <div className="hidden md:block">
                <nav aria-label="Global">
                  <ul className="flex items-center gap-6 text-sm">
                    {navMenu.map((item) => {
                      return (
                        <li
                          key={item.id}
                          className=" text-[15px]  "
                        >
                          <Link
                            href={item.url}
                            className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                          >
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              <div className="flex items-center justify-end gap-4 w-[100px]">
                <div className="sm:flex sm:gap-4 items-center">
                  {session ? (
                    <>
                      <div className="hidden sm:flex">
                        <Link
                          className="rounded-full flex items-center justify-center gap-3 bg-gray-100 px-5 py-3 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                          href={`${process.env.NEXT_URL}agency`}
                        >
                          <Compass size={18} /> Creact
                        </Link>
                      </div>

                      <UserBtn
                        size="md:h-10 h-9 md:w-10 w-9"
                        margin="mt-2 z-[101] rounded-2xl"
                        className="hidden overflow-hidden  rounded-full bg-gradient-to-br from-[#0b13ec] to-[#fe13de] text-violet-200 text-[20px] font-semibold sm:flex items-center justify-center outline-none border-none"
                      ></UserBtn>
                      <button
                        className="sm:hidden overflow-hidden md:h-10 h-9 md:w-10 w-9 rounded-full bg-gradient-to-br from-[#0b13ec] to-[#fe13de] text-violet-200 text-[20px] font-semibold flex items-center justify-center"
                        aria-label={session?.user?.image ? "Profile picture" : "User profile"}
                      >
                        {session?.user?.image ? (
                          <>
                            <Image
                              width={50}
                              height={50}
                              src={session?.user?.image}
                              alt="profile_pic"
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`${process.env.NEXT_URL}auth/login`}
                        className="hidden sm:flex"
                      >
                        <Button blue>Login</Button>
                      </Link>

                      <div className="hidden sm:flex">
                        <Link
                          className="rounded-full bg-gray-100 px-5 py-3 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                          href={`${process.env.NEXT_URL}auth/register`}
                        >
                          Register
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                <div className=" sm:hidden border border-[#aaaaaa]/30 h-9 w-9 rounded-full flex items-center justify-center">
                  <MobileMenuButton>
                    <MobileMenu />
                  </MobileMenuButton>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </header>
  );
};

export default Header;
