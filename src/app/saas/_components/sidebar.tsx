"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { GROUPLE_CONSTANTS } from "@/constants";
import { SAAS_SIDEBAR } from "@/constants/menus";
import { Bolt, ChevronsUpDown } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col justify-between w-[270px] p-6 h-full">
      <div>
        {/* <div className="relative flex items-center mt-2 mb-7 px-3">
          <div className="relative right-0 flex items-center w-full overflow-x-hidden">
            <Image
              src={"/azeorex.png"}
              alt="logo"
              width={400}
              height={400}
              className="!rounded-lg w-8 h-8"
            />
            <h1 className="text mx-2">Azeorex</h1>
          </div>
          <Bolt
            size={18}
            color="#86868D"
          />
        </div> */}
        <Popover>
          <PopoverTrigger
            asChild
            className="mb-7"
          >
            <div className="inline-flex cursor-pointer  items-center justify-between whitespace-nowrap text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50  w-full mb-4 rounded-xl">
              <div className="flex  items-center text-left gap-4">
                <Image
                  src={"/azeorex.png"}
                  alt="logo"
                  width={400}
                  height={400}
                  className="!rounded-full w-10 h-10"
                />
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
          {/* <PopoverContent className=" h-64 w-60 mt-4 p-3 z-[200] box">
            <Command className="rounded-lg">
              <CommandInput placeholder="Search Accounts..." />
              <CommandList className="pb-16">
                <CommandEmpty> No results found</CommandEmpty>
                {(user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") && user?.Agency && (
                  <CommandGroup heading="Agency">
                    <CommandItem className="!bg-transparent my-2 text-primary broder-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                      {defaultOption ? (
                        <Link
                          href={`/agency/${user?.Agency?.id}`}
                          className="flex gap-4 w-full h-full"
                        >
                          <div className="relative w-16">
                            <Image
                              src={user?.Agency?.agencyLogo}
                              alt="Agency Logo"
                              fill
                              className="rounded-md object-contain"
                            />
                          </div>
                          <div className="flex flex-col flex-1">
                            {user?.Agency?.name}
                            <span className="text-muted-foreground">{user?.Agency?.address}</span>
                          </div>
                        </Link>
                      ) : (
                        <SheetClose asChild>
                          <Link
                            href={`/agency/${user?.Agency?.id}`}
                            className="flex gap-4 w-full h-full"
                          >
                            <div className="relative w-16">
                              <Image
                                src={user?.Agency?.agencyLogo}
                                alt="Agency Logo"
                                fill
                                className="rounded-md object-contain"
                              />
                            </div>
                            <div className="flex flex-col flex-1">
                              {user?.Agency?.name}
                              <span className="text-muted-foreground">{user?.Agency?.address}</span>
                            </div>
                          </Link>
                        </SheetClose>
                      )}
                    </CommandItem>
                  </CommandGroup>
                )}
              </CommandList>
              {(user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") && (
                <SheetClose>
                  <Button
                    size={"sm"}
                    className="w-full flex gap-2  bg-blue-500 text-white hover:bg-blue-700 "
                    onClick={() => {
                      setOpen(
                        <CustomModal
                          title="Create A Subaccount"
                          subheading="You can switch between your agency account and the subaccount from the sidebar"
                        >
                          <SubAccountDetails
                            agencyDetails={user?.Agency as Agency}
                            userId={user?.id as string}
                            userName={user?.name}
                          />
                        </CustomModal>
                      );
                    }}
                  >
                    <PlusCircleIcon size={15} />
                    Create Sub Account
                  </Button>
                </SheetClose>
              )}
            </Command>
          </PopoverContent> */}
        </Popover>
        {GROUPLE_CONSTANTS?.saasSideBar?.map((sidebarOptions, idx) => {
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
      <div className="bg-[#1e1f22] w-full rounded-xl flex flex-col gap-4 p-4">
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
    </div>
  );
};

export default Sidebar;
