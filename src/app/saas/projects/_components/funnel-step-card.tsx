import { Card, CardContent } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";
import { FunnelPage } from "@prisma/client";
import { ArrowDown, Flame, Mail } from "lucide-react";
import { Draggable } from "react-beautiful-dnd";
import { createPortal } from "react-dom";

type Props = {
  funnelPage: FunnelPage;
  index: number;
  activePage: boolean;
};

const FunnelStepCard = ({ activePage, funnelPage, index }: Props) => {
  console.log(funnelPage);

  return (
    <Card className="p-0 relative mb-3 bg-[#26262626]">
      <CardContent className="p-3 flex items-center gap-4 flex-row ">
        <div className="h-12 w-12 border border-zinc-700/90 bg-muted/90 flex items-center justify-center rounded-[11px]">
          <Flame
            strokeWidth={1}
            className="opacity-70"
          />
        </div>
        <div>
          <p className=" text-sm opacity-90">{funnelPage.name}</p>
          <p className="text-[12px] text-white/40 mt-0.5"> Last edited {timeAgo(String(funnelPage.updatedAt))}</p>
        </div>
        <div>
          
        </div>
      </CardContent>
      {activePage && <div className="w-2 top-3 right-3 h-2 absolute bg-emerald-500 rounded-full" />}
    </Card>
  );
};

export default FunnelStepCard;
