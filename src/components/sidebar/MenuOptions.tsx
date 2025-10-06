"use client";
import { AffiliateDuoToneBlack, Compass, CreditCard, Dashboard, FileDuoToneBlack, Settings, ZapDouToneBlack } from "@/icons";
import { Chip } from "@/icons/chip";
import { Funnel } from "@/icons/funnel";
import { Media } from "@/icons/media";
import { Pipeline } from "@/icons/pipeline";
import { Agency } from "@prisma/client";
import clsx from "clsx";
import { Bolt, ChevronsUpDown, Menu, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Fa500Px } from "react-icons/fa";
import { useModal } from "../../../providers/model-provider";
import CustomModal from "../global/CustomModal";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

type Props = {
  type: string;
  defaultOption?: boolean;
  sideBarOpt: any;
  sidebarLogo: string;
  details: any;
  user: any;
};

function MenuOptions({ type, defaultOption, sideBarOpt, sidebarLogo, details, user }: Props) {
  const { setOpen } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  const openState = useMemo(() => (defaultOption ? { open: true } : {}), [defaultOption]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  const iconMapping: Record<string, React.ReactElement> = {
    category: <Dashboard />,
    clipboardIcon: <FileDuoToneBlack />,
    payment: <CreditCard />,
    settings: <Settings />,
    person: <AffiliateDuoToneBlack />,
    shield: <ZapDouToneBlack />,
    pipelines: <Funnel />,
    database: <Media />,
    chip: <Chip />,
    flag: <Pipeline />,
  };

  return (
    <Sheet
      modal={false}
      {...openState}
    >
      <SheetTrigger
        asChild
        className=" absolute left-4 top-4 z-[100] md:hidden flex"
      >
        <Button
          size={"icon"}
          variant={"outline"}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX
        side="left"
        className={clsx(" bg-background/80 backdrop-blur-xl fixed borde-r-[1px] p-4 pt-6", {
          "hidden md:inline-block z-0 w-[280px]": defaultOption,
          "inline-block md:hidden z-[100] w-full": !defaultOption,
        })}
      >
        <div className="h-full flex flex-col">
          <div className="relative flex items-center mb-2 px-3">
            <div className="relative right-0 flex items-center w-full overflow-x-hidden">
              <Image
                src={sidebarLogo}
                alt="logo"
                width={400}
                height={400}
                className="!rounded-full w-6 h-6"
              />
              <h1 className="text-lg mx-2">{details.name}</h1>
            </div>
            <Bolt
              size={18}
              color="#ddd"
            />
          </div>
          <Popover>
            <PopoverTrigger
              asChild
              className="mb-4"
            >
              <div className="inline-flex cursor-pointer border-white/10 bg-zinc-900 px-4 items-center justify-between whitespace-nowrap text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50  w-full my-4 py-4 border-2 rounded-xl">
                <div className="flex  items-center text-left gap-4">
                  <Image
                    src={sidebarLogo}
                    alt="logo"
                    width={400}
                    height={400}
                    className="!rounded-full w-10 h-10"
                  />
                  <div className="flex flex-col">
                    <h3 className=" text-base">{details.name}</h3>
                    <span className="text-muted-foreground">{details.address.substring(0, 15)}...</span>
                  </div>
                </div>
                <div>
                  <ChevronsUpDown
                    size={16}
                    className="text-muted-foreground"
                  />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className=" h-64 w-60 mt-4 p-3 z-[200] box">
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
                            Subaccount details
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
            </PopoverContent>
          </Popover>
          <div className=" flex-1 ">
            <Command className="rounded-lg justify-between overflow-visible bg-transparent h-full">
              <CommandList className="pb-6 h-full overflow-visible">
                <CommandEmpty>No Results Found</CommandEmpty>
                <CommandGroup className="overflow-visible p-0">
                  {sideBarOpt.map((sidebarOptions: any) => {
                    const IconComponent = iconMapping[sidebarOptions.icon] || <Fa500Px />; // Fallback to a default icon if not found
                    return (
                      <CommandItem
                        key={sidebarOptions.id}
                        className=" w-full mb-1  group px-3 h-10 rounded-lg"
                      >
                        <Link
                          href={sidebarOptions.link}
                          className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                        >
                          <div className="flex items-center gap-4 group-hover:gap-5 duration-300">
                            {IconComponent}
                            {sidebarOptions.name}
                          </div>
                        </Link>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
              <div className="mb-4">
                <CommandInput placeholder="Search..." />
              </div>
            </Command>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MenuOptions;
