"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { GROUPLE_CONSTANT } from "@/constants";
// import { SAAS_SIDEBAR } from "@/constants/menus";
import { Bolt, ChevronsUpDown, HeartHandshake, Menu, Package, Star } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="h-8 w-8 flex items-center justify-center bg-[#2d2f33] hover:bg-[#242529] rounded-md border border-[#545454]/30 absolute md:hidden left-7 top-7"
      >
        <Menu size={18} />
      </div>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className={`bg-[#0000009c] absolute w-full h-full z-[10] block duration-200 md:hidden ${isOpen ? "block" : "!hidden"}`}
      ></div>
      <div className={`bg-[#141414] flex flex-col justify-between w-[270px] p-6 pr-6 md:pr-0 pb-7 h-full absolute z-[20] md:relative duration-200 ${isOpen ? "left-0" : "-left-[270px] md:left-0"}`}>
        <div>
          <Popover>
            <PopoverTrigger
              asChild
              className="mb-7"
            >
              <div className="inline-flex cursor-pointer  items-center justify-between whitespace-nowrap text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50  w-full mb-4 rounded-xl">
                <div className="flex  items-center text-left gap-4">
                  <Link href={"/"}>
                    <Image
                      src={"/azeorex.png"}
                      alt="logo"
                      width={400}
                      height={400}
                      className="!rounded-full w-10 h-10"
                    />
                  </Link>

                  <div className="flex flex-col">
                    <h3 className=" text-base">Azeorex</h3>
                    <span className="text-muted-foreground">Break all the limits.</span>
                  </div>
                </div>
                {/* <div>
                <ChevronsUpDown
                  size={16}
                  className="text-muted-foreground"
                />
              </div> */}
              </div>
            </PopoverTrigger>
          </Popover>
          {GROUPLE_CONSTANT?.saasSideBarOptions?.map((sidebarOptions, idx) => {
            return (
              <div
                key={idx}
                className={`w-full mb-1 hover:bg-zinc-900 group px-3 h-9 rounded-lg ${pathname.toString() === sidebarOptions.link ? "bg-[#1E1F22] hover:bg-[#1E1F22]" : ""}`}
              >
                <Link
                  href={sidebarOptions.link as Url}
                  className="flex items-center gap-2  h-full rounded-md transition-all md:w-full w-[320px]"
                >
                  <div className="flex items-center gap-2  duration-300 text-sm text-zinc-400/80">
                    {sidebarOptions.icon}
                    {sidebarOptions.name}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div>
          <div className="bg-[#1e1f22] w-full rounded-xl flex flex-col gap-4 p-4 mb-4">
            <div>
              <h5 className="text-sm text-zinc-300 mb-0.5">Upgrade your plan</h5>
              <p className="text-xs text-zinc-500">For unlock all feature on azeorex.</p>
            </div>
            <Button
              className="bg-main hover:bg-main/80 text-white"
              size="sm"
            >
              Upgrate
            </Button>
          </div>
          <div>
            {[
              {
                id: 0,
                name: "Abouts",
                link: `#`,
                icon: <Package size={18} />,
              },
              {
                id: 1,
                name: "Reviews",
                link: `#`,
                icon: <Star size={18} />,
              },
              {
                id: 1,
                name: "Help & Feedback",
                link: `#`,
                icon: <HeartHandshake size={18} />,
              },
            ].map((sidebarOptions, idx) => {
              return (
                <div
                  key={idx}
                  className={`w-full mb-1 hover:bg-zinc-900 group px-3 h-9 rounded-lg ${pathname.toString() === sidebarOptions.link ? "bg-[#1E1F22] !hover:bg-[#1E1F22]" : ""}`}
                >
                  <Link
                    href={sidebarOptions.link as Url}
                    className="flex items-center gap-2  h-full rounded-md transition-all md:w-full w-[320px]"
                  >
                    <div className="flex items-center gap-2  duration-300 text-sm text-zinc-400/80">
                      {sidebarOptions.icon}
                      {sidebarOptions.name}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
