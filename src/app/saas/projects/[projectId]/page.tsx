import BlurPage from "@/components/global/blur-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFunnel, getProject } from "@/lib/queries";
import Link from "next/link";
import { redirect } from "next/navigation";
import FunnelSteps from "../_components/funnel-stapes";
import { auth } from "../../../../../auth";
import { ChevronRight, CircleDot, Code2, ExternalLink, Globe, LeafIcon, Loader2, Mail, MoreHorizontal, MoveDown, MoveLeft, RefreshCw } from "lucide-react";
import FunnelPageCreateBtn from "../_components/funnel-page-create-btn";
import { Button } from "@/components/ui/button";
import { FunnelPageTable } from "../_components/funnel-page-table";
import { timeAgo } from "@/lib/utils";

type Props = { params: { projectId: string } };
const FunnelPage = async ({ params }: Props) => {
  const session = await auth();
  const funnelId = params.projectId;
  const agencyId = session?.user?.id || "";

  const project = await getProject(funnelId);
  if (!project) return redirect(`saas/projects`);

  return (
    <div className="h-full flex flex-col gap-3 md:pl-6">
      <div className="flex-1 flex flex-col md:border-l border-zinc-800">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6">
          <h1 className="sm:pl-3">Setup your website</h1>
          <div className="sm:flex hidden items-center gap-4 ">
            <Button
              variant="outline"
              size="sm"
              className="text-zinc-400 border-zinc-700 hover:bg-zinc-800"
            >
              <CircleDot className="w-4 h-4 mr-2" />
              Feedback
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400"
            >
              Help
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400"
            >
              Docs
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 md:p-8 p-5">
          <div className="max-w-5xl mx-auto">
            {/* Domain header */}
            <div className="flex sm:flex-row flex-col items-center mb-8">
              <div className="w-20 h-20 p-[4px] rounded-[18px] border-2 border-white/40 sm:mr-4 sm:mb-0 mb-3">
                <div className="rounded-[12px] bg-amber-950 w-full h-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 sm:text-left text-center">Domain Name</div>
                <h1 className="text-2xl font-bold sm:text-left text-center">{project.subDomainName}.azeorex.com</h1>
              </div>
              <div className="ml-auto mr-auto sm:mr-0 sm:mt-0 mt-3 flex items-center gap-2">
                <Button
                  className="flex items-center gap-1 h-8">Edit</Button>
                <FunnelPageCreateBtn
                  userId={agencyId}
                  projectId={funnelId}
                  length={project.FunnelPages.length}
                />
              </div>
            </div>

            {/* Domain info */}
            <div className="grid sm:grid-cols-3 grid-cols-2    mb-6 text-[13px] sm:w-[550px] overscroll-x-auto w-full">
              <div>
                <div className=" text-zinc-500 mb-1">CREATED</div>
                <div className="py-1">{timeAgo(project.createdAt)}</div>
              </div>
              <div>
                <div className=" text-zinc-500 mb-1">STATUS</div>
                {project.published ? (
                  <div className="inline-flex items-center px-2 py-1 rounded bg-green-950/50 text-green-500 ">Active</div>
                ) : (
                  <div className="inline-flex items-center px-2 py-1 rounded bg-amber-950/50 text-amber-500 ">Pending</div>
                )}
              </div>
              <div className="sm:block hidden">
                <div className=" text-zinc-500 mb-1">REGION</div>
                <div className="flex items-center py-1">
                  <span className="mr-2">🇺🇸</span>
                  North Virginia <span className="text-zinc-500 ml-1">(us-east-1)</span>
                </div>
              </div>
            </div>

            {/* Status message */}
            <div className=" bg-gradient-to-r from-amber-950/60 via-transparent to-transparent border border-amber-900/50 rounded-xl text-sm p-4">
              <div className="flex items-center">
                <Loader2 className="w-5 h-5 text-amber-500 animate-spin mr-3" />
                <div className="font-medium">Looking for DNS records in your domain provider...</div>
              </div>
              <div className="text-zinc-400 mt-1 ml-8">It may take a few minutes or hours, depending on the DNS provider propagation time.</div>
            </div>

            <FunnelPageTable pageDetails={project.FunnelPages} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FunnelPage;
