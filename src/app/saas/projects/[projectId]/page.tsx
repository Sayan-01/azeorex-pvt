import BlurPage from "@/components/global/blur-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFunnel, getProject } from "@/lib/queries";
import Link from "next/link";
import { redirect } from "next/navigation";
import FunnelSteps from "../_components/funnel-stapes";
import { auth } from "../../../../../auth";
import { ChevronRight, LeafIcon, MoveDown, MoveLeft } from "lucide-react";
import FunnelPageCreateBtn from "../_components/funnel-page-create-btn";

type Props = { params: { projectId: string } };
const FunnelPage = async ({ params }: Props) => {
  const session = await auth();
  const funnelId = params.projectId;
  const agencyId = session?.user?.id || "";
  const funnelPages = await getProject(funnelId);

  if (!funnelPages) return redirect(`saas/projects`);

  return (
    <div className="pb-7 h-full flex flex-col gap-3">
      <div className="flex gap-2 !h-8 py-1 items-center text-white/70 ">
        <Link
          href={`/ssas/projects`}
          className="flex justify-between gap-4 "
        >
          Projects
        </Link>
        <ChevronRight size={16} />
        <p className="">{String(funnelPages.name).charAt(0).toUpperCase() + String(funnelPages.name).slice(1)}</p>
      </div>
      <div className="relative bg-[#ffffff02] border-2 border-[#29282d69] rounded-2xl p-5 h-[calc(100%-44px)] flex flex-col gap-5">
        <div>
          <h2 className="text-[24px] font-semibold ">Setup your website !</h2>
        </div>

        <FunnelSteps
          funnel={funnelPages}
          agencyId={agencyId}
          pages={funnelPages.FunnelPages}
          funnelId={funnelId}
        />
      </div>
    </div>
  );
};

export default FunnelPage;
