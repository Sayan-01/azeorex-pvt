import { db } from "@/lib/db";
import { getDomainContent } from "@/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import { EditorProvider } from "../../../providers/editor/editor-provider";
import { WebsiteBuilder } from "../playground/_components/website-builder";

const Page = async (props: { params: Promise<{ domain: string }> }) => {
  const params = await props.params;
  const domainWithoutPort = params.domain.split(":")[0];
  const domainName = domainWithoutPort.split(".")[0];

  const domainData = await getDomainContent(domainName);

  if (!domainData) return notFound();

  const pageData = domainData.FunnelPages.find((page) => !page.pathName);

  if (!pageData?.content) return notFound();

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
      userId={domainData.userId}
      projectId={domainData.id}
      funnelPageDetails={pageData}
      funnelPageId={pageData.id}
    >
       <WebsiteBuilder
          funnelPageId={pageData.id}
          liveMode={true}
        />
    </EditorProvider>
  );
};

export default Page;
