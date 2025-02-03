import { db } from "@/lib/db";
import { getDomainContent } from "@/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import EditorProvider from "../../../providers/editor/editor-provider";
import FunnelEditor from "../(website)/agency/[agencyId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor";

const Page = async ({ params }: { params: { domain: string } }) => {
  const domainData = await getDomainContent(params.domain);
  if (!domainData) return notFound();

  const pageData = domainData.FunnelPages.find((page) => !page.pathName);

  if (!pageData) return notFound();

  await db.funnelPage.update({
    where: {
      id: pageData.id,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  });

  return (
    <EditorProvider
      agencyId={domainData.agencyId}
      pageDetails={pageData}
      funnelId={domainData.id}
    >
      <FunnelEditor
        funnelPageId={pageData.id}
        liveMode={true}
      />
    </EditorProvider>
  );
};

export default Page;
