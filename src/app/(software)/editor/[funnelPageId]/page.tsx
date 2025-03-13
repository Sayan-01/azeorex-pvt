import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import FunnelEditor from "./_components/funnel-editor";
import FunnelEditorNavigation from "./_components/funnel-editor-navigation";
import FunnelEditorSidebar from "./_components/funnel-editor-sidebar";
import { Inter } from "next/font/google";
import EditorProvider from "../../../../../providers/editor/editor-provider";

type Props = {
  params: {
    funnelPageId: string;
  };
  searchParams: {
    userId?: string;
    projectId?: string;
  };
};

const inte = Inter({ subsets: ["latin"] });

const page = async ({ params, searchParams }: Props) => {
  const agencyId = searchParams.userId;
  const funnelId = searchParams.projectId;
  if (!agencyId || !funnelId) {
    return null;
  }

  const funnelPageDetails = await db.funnelPage.findFirst({
    where: {
      id: params.funnelPageId,
    },
  });
  if (!funnelPageDetails) {
    return redirect(`/agency/${agencyId}/funnels/${funnelId}`);
  }

  return (
    <>
      <div className={`fixed top-0 bottom-0 left-0 right-0 z-20 bg-[#333333] overflow-hidden ${inte.className}`}>
        {/* starts from 16:39 */}
        <EditorProvider
          agencyId={agencyId}
          funnelId={funnelId}
          pageDetails={funnelPageDetails}
        >
          <FunnelEditorNavigation
            funnelId={funnelId}
            funnelPageDetails={funnelPageDetails}
            agencyId={agencyId}
          />
          <div className="h-full flex justify-center ">
            <FunnelEditor funnelPageId={params.funnelPageId} />
          </div>
          <FunnelEditorSidebar
            agencyId={agencyId}
            funnelId={funnelId}
          />
        </EditorProvider>
      </div>
    </>
  );
};

export default page;
