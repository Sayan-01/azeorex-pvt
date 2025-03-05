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

type Props = { params: { projectId: string } };
const FunnelPage = async ({ params }: Props) => {
  const session = await auth();
  const funnelId = params.projectId;
  const agencyId = session?.user?.id || "";
  const funnelPages = await getProject(funnelId);

  if (!funnelPages) return redirect(`saas/projects`);

  return (
    <div className="h-full flex flex-col gap-3 md:pl-6">
      {/* <div className="flex gap-2 !h-8 py-1 items-center text-white/70 ">
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
      </div> */}
      <div className="flex-1 flex flex-col md:border-l border-zinc-800">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6">
          <h1 className="pl-3">Setup your website</h1>
          <div className="flex items-center gap-4">
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
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 p-[4px] rounded-[18px] border-2 border-white/40 mr-4">
                <div className="rounded-[12px] bg-amber-950 w-full h-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">Domain</div>
                <h1 className="text-2xl font-bold">azeorex.com</h1>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {/* <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  Restart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                >
                  <Code2 className="w-4 h-4" />
                  API
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button> */}
                <Button className={" bg-blue-500 hover:bg-blue-500/80 text-white hover:text-white "}>+ Create new page</Button>
              </div>
            </div>

            {/* Domain info */}
            <div className="grid grid-cols-3  mb-6 text-[13px] w-[550px]">
              <div>
                <div className=" text-zinc-500 mb-1">CREATED</div>
                <div className="py-1">6 months ago</div>
              </div>
              <div>
                <div className=" text-zinc-500 mb-1">STATUS</div>
                <div className="inline-flex items-center px-2 py-1 rounded bg-amber-950/50 text-amber-500 ">Pending</div>
              </div>
              <div>
                <div className=" text-zinc-500 mb-1">REGION</div>
                <div className="flex items-center py-1">
                  <span className="mr-2">🇺🇸</span>
                  North Virginia <span className="text-zinc-500 ml-1">(us-east-1)</span>
                </div>
              </div>
            </div>

            {/* Status message */}
            <div className=" bg-gradient-to-r from-amber-950/60 via-transparent to-transparent border border-amber-900/50 rounded-xl text-sm p-4 mb-8">
              <div className="flex items-center">
                <Loader2 className="w-5 h-5 text-amber-500 animate-spin mr-3" />
                <div className="font-medium">Looking for DNS records in your domain provider...</div>
              </div>
              <div className="text-zinc-400 mt-1 ml-8">It may take a few minutes or hours, depending on the DNS provider propagation time.</div>
            </div>

            {/* A Records */}
            <div className="overflow-x-auto py-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-zinc-500 border border-zinc-800 rounded-lg bg-zinc-800">
                    <th className="pb-2 font-normal">Type</th>
                    <th className="pb-2 font-normal">Host / Name</th>
                    <th className="pb-2 font-normal">Value</th>
                    <th className="pb-2 font-normal">Priority</th>
                    <th className="pb-2 font-normal">TTL</th>
                    <th className="pb-2 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3">MX</td>
                    <td>send</td>
                    <td className="truncate max-w-[300px]">feedback-smtp.us-east-...</td>
                    <td>10</td>
                    <td>Auto</td>
                    <td>
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-950/50 text-amber-500 text-xs">Pending</span>
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3">TXT</td>
                    <td>send</td>
                    <td className="truncate max-w-[300px]">v=spf1 include:amazons...</td>
                    <td></td>
                    <td>Auto</td>
                    <td>
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-950/50 text-amber-500 text-xs">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">TXT</td>
                    <td>resend._domainkey</td>
                    <td className="truncate max-w-[300px]">p=MIGfMA0GCSqGSIb3DQEB...</td>
                    <td></td>
                    <td>Auto</td>
                    <td>
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-950/50 text-amber-500 text-xs">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DNS Records */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg mb-8">
              <div className="p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">DNS Records</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Learn more
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* DKIM and SPF */}
              <div className="border-t border-zinc-800 p-4">
                <div className="flex items-center mb-4">
                  <h3 className="font-medium">DKIM and SPF</h3>
                  <ExternalLink className="w-4 h-4 ml-2 text-zinc-500" />
                  <div className="ml-3 text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">Required</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-zinc-500 border-b border-zinc-800">
                        <th className="pb-2 font-normal">Type</th>
                        <th className="pb-2 font-normal">Host / Name</th>
                        <th className="pb-2 font-normal">Value</th>
                        <th className="pb-2 font-normal">Priority</th>
                        <th className="pb-2 font-normal">TTL</th>
                        <th className="pb-2 font-normal">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-800">
                        <td className="py-3">MX</td>
                        <td>send</td>
                        <td className="truncate max-w-[300px]">feedback-smtp.us-east-...</td>
                        <td>10</td>
                        <td>Auto</td>
                        <td>
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-950/50 text-amber-500 text-xs">Pending</span>
                        </td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="py-3">TXT</td>
                        <td>send</td>
                        <td className="truncate max-w-[300px]">v=spf1 include:amazons...</td>
                        <td></td>
                        <td>Auto</td>
                        <td>
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-950/50 text-amber-500 text-xs">Pending</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3">TXT</td>
                        <td>resend._domainkey</td>
                        <td className="truncate max-w-[300px]">p=MIGfMA0GCSqGSIb3DQEB...</td>
                        <td></td>
                        <td>Auto</td>
                        <td>
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-950/50 text-amber-500 text-xs">Pending</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DMARC */}
              <div className="border-t border-zinc-800 p-4">
                <div className="flex items-center mb-4">
                  <h3 className="font-medium">DMARC</h3>
                  <ExternalLink className="w-4 h-4 ml-2 text-zinc-500" />
                  <div className="ml-3 text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">Recommended</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-zinc-500 border-b border-zinc-800">
                        <th className="pb-2 font-normal">Type</th>
                        <th className="pb-2 font-normal">Host / Name</th>
                        <th className="pb-2 font-normal">Value</th>
                        <th className="pb-2 font-normal">TTL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3">TXT</td>
                        <td>_dmarc</td>
                        <td>v=DMARC1; p=none;</td>
                        <td>Auto</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FunnelPage;
