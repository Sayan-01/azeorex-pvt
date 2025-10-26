import React from "react";
import PlaygroundPage, { Messages } from "./playground-page";
import { db } from "@/lib/db";
import { EditorProvider } from "../../../../providers/editor/editor-provider";
import { NewEditorProvider } from "../../../../providers/newPeovider";

type Props = {
  params: Promise<{
    funnelPageId: string;
  }>;
  searchParams: Promise<{
    userId?: string;
    projectId?: string;
  }>;
};

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

  if (!funnelPageDetails) {
    return null;
  }

  const chatDetails = await db.chat.findUnique({
    where: {
      funnelPageId: params.funnelPageId,
    },
  });

  return (
    <div className={`fixed top-0 bottom-0 left-0 right-0 z-20 bg-[#272727]  overflow-hidden `}>
      <EditorProvider
        agencyId={userId}
        funnelId={projectId}
        pageDetails={funnelPageDetails}
      >
      <NewEditorProvider>
        <PlaygroundPage
          funnelPageDetails={funnelPageDetails || {}}
          userId={userId}
          projectId={projectId}
          chatMessages={(chatDetails?.chatMessage as Messages[]) || []}
        />
      </NewEditorProvider>
      </EditorProvider>
    </div>
  );
};

export default page;
