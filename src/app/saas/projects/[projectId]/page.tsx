import { Button } from "@/components/ui/button";
import { getProject, updateDomainName } from "@/lib/queries";
import { timeAgo } from "@/lib/utils";
import { CircleDot, Globe, Loader2, Pen } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import FunnelPageCreateBtn from "../_components/funnel-page-create-btn";
import { FunnelPageTable } from "../_components/funnel-page-table";
import Link from "next/link";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import { getAllCMSCollection } from "../../../../../server/cms";
import { Roboto_Mono } from "next/font/google";
import DomainEditButton from "../_components/domain-edit-button";

const outf = Roboto_Mono({ subsets: ["latin"], weight: "400" });

type Props = { params: Promise<{ projectId: string }> };
const FunnelPage = async (props: Props) => {
  const params = await props.params;
  const session = await auth();
  const projectId = params.projectId;
  const agencyId = session?.user?.id || "";

  const project = await getProject(projectId);
  if (!project) return redirect(`saas/projects`);

  const items = await getAllCMSCollection(params.projectId);

  return (
    <div className={`h-full flex flex-col gap-3 md:pl-6 ${outf.className}`}>
      <div className="flex-1 flex flex-col md:border-l border-zinc-800">
        {/* Header */}
        <header className="md:h-[88px] h-[76px] border-b border-zinc-800 flex items-center justify-between px-6">
          <h1 className="sm:pl-3 text-sm opacity-70"></h1>
          <div className="sm:flex hidden items-center gap-3 sm:mr-12 md:mr-0">
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
          <div className="max-w-5xl mx-auto relative">
            {/* Domain header */}
            <div className="flex sm:items-center items-start sm:flex-row flex-col mb-8">
              <div className="w-20 h-20 p-[4px] rounded-[18px] border-2 border-white/40 sm:mr-4 sm:mb-0 mb-3 shrink-0">
                <div className="rounded-[12px] bg-amber-950 w-full h-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-amber-400" />
                </div>
              </div>

              <div className="flex sm:items-center items-start sm:gap-2 gap-1 h-min w-full">
                <div className="min-w-0 max-md:flex-1">
                  <div className="text-sm font-semibold text-zinc-500 text-left">Domain</div>
                  <h1 className="md:text-2xl text-lg break-words font-bold text-left truncate sm:max-w-none max-w-full">
                    <Link
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_URL_SCHEME}${project.subDomainName}.${process.env.NEXT_PUBLIC_URL_DOMAIN}`}
                    >
                      {`${project.subDomainName}.${process.env.NEXT_PUBLIC_URL_DOMAIN}`.slice(0, 20)}...
                    </Link>
                  </h1>
                </div>

                <DomainEditButton projectId={projectId} />
              </div>
              
            </div>

            
            <Menubar>
              <MenubarMenu>
                <div className="relative w-full">
                  <MenubarTrigger
                    asChild
                    className="absolute sm:right-[114px] right-0 top-[24px]"
                  >
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 h-9 text-white hover:text-white rounded-[16px]"
                    >
                      + Create Page
                    </Button>
                  </MenubarTrigger>

                  <MenubarContent className="bg-[#272727] absolute -right-[147px] w-max  ">
                    <FunnelPageCreateBtn
                      userId={agencyId}
                      projectId={projectId}
                      length={project.FunnelPages.length}
                    />

                    <MenubarSub>
                      <MenubarSubTrigger
                        className="text-sm text-gray-300 opacity-40"
                        disabled
                      >
                        New CMS Page
                        <span className="border border-green-600 bg-green-500/30 rounded-full px-1.5 text-sm pb-[1px] ml-3">comming soon</span>
                      </MenubarSubTrigger>

                      <MenubarSubContent className="bg-[#272727]">
                        {items.map((item) => (
                          <MenubarSub key={item.name}>
                            <MenubarSubTrigger className="text-xs text-gray-300">{item.name}</MenubarSubTrigger>
                            <MenubarSubContent className="ml-3 bg-[#272727]">
                              <MenubarItem className="text-xs text-gray-300">Index</MenubarItem>
                              <MenubarItem className="text-xs text-gray-300">Details Page</MenubarItem>
                            </MenubarSubContent>
                          </MenubarSub>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarContent>
                </div>
              </MenubarMenu>
            </Menubar>
            <FunnelPageTable
              pageDetails={project.FunnelPages}
              subDomainName={project.subDomainName || ""}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FunnelPage;
