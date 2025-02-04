import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import FunnelEditor from "./_components/funnel-editor";
import FunnelEditorNavigation from "./_components/funnel-editor-navigation";
import FunnelEditorSidebar from "./_components/funnel-editor-sidebar";
import { Inter } from "next/font/google";
import EditorProvider from "../../../../../../../providers/editor/editor-provider";

type Props = {
  params: {
    agencyId: string;
    funnelId: string;
    funnelPageId: string;
  };
};

const inter = Inter({ subsets: ["latin"] });

const page = async ({ params }: Props) => {
  const funnelPageDetails = await db.funnelPage.findFirst({
    where: {
      id: params.funnelPageId,
    },
  });
  if (!funnelPageDetails) {
    return redirect(`/agency/${params.agencyId}/funnels/${params.funnelId}`);
  }

  return (
    <div className={`fixed top-0 bottom-0 border-x border-main-az left-0 right-0 z-20 bg-zinc-950 overflow-hidden ${inter.className}`}>
      {/* starts from 16:39 */}
      <EditorProvider
        agencyId={params.agencyId}
        funnelId={params.funnelId}
        pageDetails={funnelPageDetails}
      >
        <FunnelEditorNavigation
          funnelId={params.funnelId}
          funnelPageDetails={funnelPageDetails}
          agencyId={params.agencyId}
        />
        <div className="h-full flex justify-center ">
          <FunnelEditor funnelPageId={params.funnelPageId} />
        </div>
        <FunnelEditorSidebar agencyId={params.agencyId} />
      </EditorProvider>
    </div>
  );
};

export default page;
