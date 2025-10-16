"use client";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GROUPLE_CONSTANT } from "@/constants";
// import { SAAS_SIDEBAR } from "@/constants/menus";
import clsx from "clsx";
import { HeartHandshake, Package, Settings, Star } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import UpgrateCard from "./upgrate-card";
import { useCredits } from "@/hooks/credit-provider";

type Props = {
  defaultOption?: boolean;
};

const SidebarComp = ({ defaultOption }: Props) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { credits } = useCredits();

  const openState = useMemo(() => (defaultOption ? { open: true } : {}), [defaultOption]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;
  return (
    <Sheet
      modal={!defaultOption}
      {...openState}
    >
      <SheetTrigger className="h-9 w-9 flex flex-col items-center justify-center rounded-xl border border-[#545454]/30 fixed z-[50] md:hidden right-5 top-5 outline-none bg-[#141414]">
        <div className="h-[1px] bg-white/40 w-4 mb-[5px]" />
        <div className="h-[1px] bg-white/40 w-4" />
      </SheetTrigger>

      <SheetContent
        showX={!defaultOption}
        side="left"
        className={clsx(`bg-[#141414] flex flex-col justify-between sm:w-[240px] w-[280px] p-6 pr-6 md:pr-0 pb-7  duration-200 border-r-0`, {
          "hidden md:flex z-0 ": defaultOption,
          "flex md:hidden z-[100] ": !defaultOption,
        })}
      >
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
                  className="flex items-center gap-2  h-full rounded-md transition-all md:w-full "
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
          <UpgrateCard credits={credits}/>
          <div>
            {[
              {
                id: 0,
                name: "Abouts",
                link: `/about`,
                icon: <Package size={18} />,
              },
              {
                id: 1,
                name: "Global Reviews",
                link: `/global-review`,
                icon: <Star size={18} />,
              },
              {
                id: 3,
                name: "Profile & Settings",
                link: `/saas/profile`,
                icon: <Settings size={18} />,
              },
            ].map((sidebarOptions, idx) => {
              return (
                <div
                  key={idx}
                  className={`w-full mb-1 hover:bg-zinc-900 group px-3 h-9 rounded-lg ${pathname.toString() === sidebarOptions.link ? "bg-[#1E1F22] !hover:bg-[#1E1F22]" : ""}`}
                >
                  <Link
                    href={sidebarOptions.link as Url}
                    className="flex items-center gap-2  h-full rounded-md transition-all md:w-full"
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
      </SheetContent>
    </Sheet>
  );
};

export default SidebarComp;
