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
import { ArrowLeftIcon, CheckCheck, ExternalLink, LucideEdit, MoveRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DragDropContext, DragStart, DropResult, Droppable } from "react-beautiful-dnd";
import { useModal } from "../../../../../providers/model-provider";
import FunnelStepCard from "../_components/funnel-step-card";
import CreateFunnelPage from "@/components/forms/funnel-page-form-project";
import FunnelPageCreateBtn from "./funnel-page-create-btn";
import Image from "next/image";

type Props = { funnel: Project; agencyId: string; pages: FunnelPage[]; funnelId: string };

const FunnelSteps = ({ funnel, agencyId, pages, funnelId }: Props) => {
  const [clickedPage, setClickedPage] = useState<FunnelPage | undefined>(pages[0]);
  const [pagesState, setPagesState] = useState(pages);
  const { toast } = useToast();
  const { setOpen } = useModal();
  console.log(agencyId);

  return (
    <div className="flex lg:!flex-row flex-col overflow-hidden h-full">
      <aside className="flex-[0.3]  flex flex-col gap-3 h-full border-r pr-5">
        <div className="overflow-clip bg-[#202124] rounded-[16px]">
          <Link
            href={`/editor/${clickedPage?.id}?userId=${agencyId}&projectId=${funnelId}`}
            className="relative group"
          >
            <div className="cursor-pointer w-full">
              <Image
                className="bg-[#191919] h-[211.5px] hover:border-blue-500/80 hover:border-4 w-full object-cover duration-200 rounded-2xl border "
                width={600}
                height={600}
                src={"/funnel-page-placeholder.svg"}
                alt="image-placeholder"
              />
            </div>
            <LucideEdit
              strokeWidth={2}
              size={22}
              className=" absolute top-4 left-4 text-blue opacity-0  group-hover:opacity-60 transition-all duration-100"
            />
          </Link>
          <Link
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_URL_SCHEME}${funnel.subDomainName}.${process.env.NEXT_PUBLIC_URL_DOMAIN}/${clickedPage?.pathName}`}
            className="group text-sm text-white/70 flex items-center justify-center p-3  rounded-b-xl gap-2 hover:text-primary transition-colors duration-200"
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
            <p className="text-sm">Upgrade to build multiple pages</p> <MoveRight strokeWidth={1} />
          </div>
          <FunnelPageCreateBtn
            userId={agencyId}
            projectId={funnelId}
            length={pagesState.length}
          />
        </div>
      </aside>
      <aside className=" flex-[0.7] pl-5 ">
        {/* <div>
          <h5>Webpage Settings</h5>
        </div> */}
        {!!pages.length ? (
          <div className="flex gap-4">
            <CreateFunnelPage
              className="w-[550px] mx-auto"
              userId={agencyId}
              defaultData={clickedPage}
              projectId={funnelId}
              order={(clickedPage?.order as number) || 0}
            />
          </div>
        ) : (
          <div className="h-[600px] flex items-center justify-center text-muted-foreground">Create a page to view page settings.</div>
        )}
      </aside>
    </div>
  );
};

export default FunnelSteps;
