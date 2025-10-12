import { db } from "@/lib/db";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import EditorProvider from "../../../../../providers/editor/editor-provider";
import MainPage, { Messages } from "./main-page";

type Props = {
  params: Promise<{
    funnelPageId: string;
  }>;
  searchParams: Promise<{
    userId?: string;
    projectId?: string;
  }>;
};

const inte = Inter({ subsets: ["latin"] });

const page = async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const userId = searchParams.userId;
  const projectId = searchParams.projectId;
  if (!userId || !projectId) {
    return null;
  }

  const funnelPageDetails = await db.funnelPage.findFirst({
    where: {
      id: params.funnelPageId,
    },
  });

  const chatDetails = await db.chat.findMany({
    where: {
      funnelPageId: params.funnelPageId,
    },
  });

  if (!funnelPageDetails) {
    return redirect(`/saas/projects/${projectId}`);
  }

  const abc = chatDetails[0]?.chatMessage || [];

  return (
    <>
      <div className={`fixed top-0 bottom-0 left-0 right-0 z-20 bg-[#333333] overflow-hidden ${inte.className}`}>
        {/* starts from 16:39 */}
        <EditorProvider
          agencyId={userId}
          funnelId={projectId}
          pageDetails={funnelPageDetails}
        >
          <MainPage
            projectId={projectId}
            funnelPageDetails={funnelPageDetails}
            userId={userId}
            chatMessages={abc as Messages[]}
          />
        </EditorProvider>
      </div>
    </>
  );
};

export default page;
