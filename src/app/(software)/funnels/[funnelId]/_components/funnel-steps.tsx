"use client";
import CreateFunnelPage from "@/components/forms/funnel-page-form";
import CustomModal from "@/components/global/CustomModal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import FunnelPagePlaceholder from "@/icons/funnel-page-placeholder";
import { upsertFunnelPage } from "@/lib/queries";
import { Funnel, FunnelPage } from "@prisma/client";
import { CheckCheck, ExternalLink, LucideEdit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DragDropContext, DragStart, DropResult, Droppable } from "react-beautiful-dnd";
import { useModal } from "../../../../../../../../providers/model-provider";
import FunnelStepCard from "./funnel-step-card";

type Props = { funnel: Funnel; agencyId: string; pages: FunnelPage[]; funnelId: string };

const FunnelSteps = ({ funnel, agencyId, pages, funnelId }: Props) => {
  const [clickedPage, setClickedPage] = useState<FunnelPage | undefined>(pages[0]);
  const [pagesState, setPagesState] = useState(pages);
  const { toast } = useToast();
  const { setOpen } = useModal();

  const onDragStart = () =>
    // event: DragStart
    {
      //current chosen page
      // const { draggableId } = event;
      // const value = pagesState.find((page: any) => page.id === draggableId);
    };

  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source } = dropResult;

    //no destination or same position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }
    //change state
    const newPageOrder = [...pagesState]
      .toSpliced(source.index, 1)
      .toSpliced(destination.index, 0, pagesState[source.index])
      .map((page, idx) => {
        return { ...page, order: idx };
      });

    setPagesState(newPageOrder);
    newPageOrder.forEach(async (page, index) => {
      try {
        await upsertFunnelPage(
          agencyId,
          {
            id: page.id,
            order: index,
            name: page.name,
          },
          funnelId
        );
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Could not save page order",
        });
        return;
      }
    });

    toast({
      title: "Success",
      description: "Saved page order",
    });
  };

  return (
    <AlertDialog>
      <div className="flex border-[1px] lg:!flex-row flex-col ">
        <aside className="flex-[0.3] bg-background p-6  flex flex-col justify-between ">
          <ScrollArea className="h-full ">
            <div className="flex gap-3 mb-2 items-center">
              <CheckCheck
                size={20}
                className=" text-blue-500"
              />
              Funnel Steps
            </div>
            {pagesState.length ? (
              <DragDropContext
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
              >
                <Droppable
                  droppableId="funnels"
                  direction="vertical"
                  key="funnels"
                >
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {pagesState.map((page: FunnelPage, idx: number) => (
                        <div
                          className="relative"
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
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="text-center text-muted-foreground py-6">No Pages</div>
            )}
          </ScrollArea>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              setOpen(
                <CustomModal
                  title=" Create or Update a Funnel Page"
                  subheading="Funnel Pages allow you to create step by step processes for customers to follow"
                >
                  <CreateFunnelPage
                    agencyId={agencyId}
                    funnelId={funnelId}
                    order={pagesState.length}
                  />
                </CustomModal>
              );
            }}
          >
            Create New Steps
          </Button>
        </aside>
        <aside className="flex-[0.7] ~ p-4 ">
          {!!pages.length ? (
            <Card className="h-full flex justify-between flex-col">
              <CardHeader>
                <p className="text-sm text-muted-foreground">Page name</p>
                <CardTitle>{clickedPage?.name}</CardTitle>
                <CardDescription className="flex flex-col gap-4">
                  <div className="border-2 rounded-lg sm:w-80 w-full  overflow-clip">
                    <Link
                      href={`/agency/${agencyId}/funnels/${funnelId}/editor/${clickedPage?.id}`}
                      className="relative group"
                    >
                      <div className="cursor-pointer group-hover:opacity-30 w-full">
                        <FunnelPagePlaceholder />
                      </div>
                      <LucideEdit
                        size={50}
                        className="!text-muted-foreground absolute top-1/2 left-1/2 opacity-0 transofrm -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-100"
                      />
                    </Link>

                    <Link
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_URL_SCHEME}${funnel.subDomainName}.${process.env.NEXT_PUBLIC_URL_DOMAIN}/${clickedPage?.pathName}`}
                      className="group flex items-center justify-start p-2 gap-2 hover:text-primary transition-colors duration-200"
                    >
                      <ExternalLink size={15} />
                      <div className="w-64 overflow-hidden overflow-ellipsis ">
                        {process.env.NEXT_PUBLIC_URL_SCHEME}
                        {funnel.subDomainName}.{process.env.NEXT_PUBLIC_URL_DOMAIN}/{clickedPage?.pathName}
                      </div>
                    </Link>
                  </div>

                  <CreateFunnelPage
                    agencyId={agencyId}
                    defaultData={clickedPage}
                    funnelId={funnelId}
                    order={(clickedPage?.order as number) || 0}
                  />
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="h-[600px] flex items-center justify-center text-muted-foreground">Create a page to view page settings.</div>
          )}
        </aside>
      </div>
    </AlertDialog>
  );
};

export default FunnelSteps;
