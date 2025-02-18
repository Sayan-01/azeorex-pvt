"use client";
import CustomModal from "@/components/global/CustomModal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import FunnelPagePlaceholder from "@/icons/funnel-page-placeholder";
import { upsertFunnelPage } from "@/lib/queries";
import { Funnel, FunnelPage, Project } from "@prisma/client";
import { ArrowLeftIcon, ArrowRight, CheckCheck, ExternalLink, LucideEdit, MoveRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DragDropContext, DragStart, DropResult, Droppable } from "react-beautiful-dnd";
import { useModal } from "../../../../../providers/model-provider";
import FunnelStepCard from "../_components/funnel-step-card";
import CreateFunnelPage from "@/components/forms/funnel-page-form-project";
import FunnelPageCreateBtn from "./funnel-page-create-btn";
import Image from "next/image";
import { AzAsGray } from "@/icons/az-as-gray";
import { useRouter } from "next/navigation";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";

type Props = { funnel: Project; agencyId: string; pages: FunnelPage[]; funnelId: string };

const FunnelSteps = ({ funnel, agencyId, pages, funnelId }: Props) => {
  const [clickedPage, setClickedPage] = useState<FunnelPage | undefined>(pages[0]);
  const [pagesState, setPagesState] = useState(pages);

  if (!!pages.length) {
    return (
      <div className="flex  flex-col overflow-hidden h-full items-center gap-4">
        {/* <Tabs className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="">Page edit</TabsTrigger>
            <TabsTrigger value="">Page settings</TabsTrigger>
            <TabsTrigger value="">funnel settings</TabsTrigger>
          </TabsList>
        </Tabs> */}
        <div className="flex-[0.3]  flex flex-col gap-5 h-full ">
          <div className="overflow-clip bg-[#202124] rounded-[16px] p-2">
            <Link
              href={`/editor/${clickedPage?.id}?userId=${agencyId}&projectId=${funnelId}`}
              className="relative group"
            >
              <div className="cursor-pointer w-full">
                <Image
                  className="bg-[#191919] h-[190px] hover: w-full object-cover duration-200 rounded-2xl border-2 border-[#202124] "
                  width={600}
                  height={600}
                  src={"/funnel-page-placeholder.svg"}
                  alt="image-placeholder"
                />
              </div>
              <div className=" absolute w-full h-full top-0 left-0 text-blue-400 opacity-0  group-hover:opacity-100 transition-all duration-100 rounded-[15px] text-sm px-3 pr-1 py-1 bg-white/10 border-2 flex items-center justify-center gap-1">
                <div className="px-4 py-2 bg-white/90 flex items-center justify-center gap-2 rounded-full font-medium">
                  Edit the page
                  <MoveRight
                    strokeWidth={1.7}
                    size={18}
                  />
                </div>
              </div>
            </Link>
            <Link
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_URL_SCHEME}${funnel.subDomainName}.${process.env.NEXT_PUBLIC_URL_DOMAIN}/${clickedPage?.pathName}`}
              className="group text-sm text-white/70 flex items-center justify-center pt-3 pb-1 rounded-b-xl gap-2 hover:text-primary transition-colors duration-200"
            >
              <div className="overflow-hidden overflow-ellipsis ">
                {process.env.NEXT_PUBLIC_URL_SCHEME}
                {funnel.subDomainName}.{process.env.NEXT_PUBLIC_URL_DOMAIN}/{clickedPage?.pathName}
              </div>
              <ExternalLink size={15} />
            </Link>
          </div>
          <div className="overflow-scroll rounded-[11px] box">
            <div className=" rounded-[11px]">
              {pagesState.map((page: FunnelPage, idx: number) => (
                <div
                  className="relative "
                  key={page.id}
                  onClick={() => setClickedPage(page)}
                >
                  <FunnelStepCard
                    funnelPage={page}
                    index={idx}
                    key={page.id}
                    activePage={page.id === clickedPage?.id}
                  />
                </div>
              ))}
            </div>
            <div className="text-center flex items-center justify-center gap-2 mt-0 text-zinc-400">
              <svg
                width="12"
                height="18"
                viewBox="0 0 12 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 10.3333L7.375 1V7.66667H11.5L4.625 17V10.3333H0.5Z"
                  fill="#726fff"
                  stroke="#726fff"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p className="text-sm">Upgrade to build Morethan 2 pages</p> <MoveRight strokeWidth={1} />
            </div>
            <FunnelPageCreateBtn
              className="absolute right-5 top-[22px]"
              userId={agencyId}
              projectId={funnelId}
              length={pagesState.length}
            />
          </div>
        </div>
        {/* <aside className=" flex-[0.7] pl-5 ">
          <div className="overflow-y-scroll box flex-col flex h-full">
            <div className="flex gap-4 mb-5">
              <CreateFunnelPage
                className="w-full mx-auto"
                userId={agencyId}
                defaultData={clickedPage}
                projectId={funnelId}
                order={(clickedPage?.order as number) || 0}
              />
            </div>
            <div className="bg-[#191919] border flex-1 flex gap-3 items-center justify-center flex-col rounded-xl">
              <AzAsGray className=" scale-90" />
              <p className="text-[#8488EE] text-sm">Currently This feature in Developing mode</p>
            </div>
          </div>
        </aside> */}
      </div>
    );
  } else {
    return (
      <div className="h-[600px] flex flex-col gap-4 items-center justify-center text-muted-foreground">
        <p>Create a page to view page settings.</p>
        <FunnelPageCreateBtn
          userId={agencyId}
          projectId={funnelId}
          length={pagesState.length}
        />
      </div>
    );
  }
};

export default FunnelSteps;
