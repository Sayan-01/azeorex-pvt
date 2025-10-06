import { getDomainContent } from "@/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import EditorProvider from "../../../../providers/editor/editor-provider";
import FunnelEditor from "@/app/(software)/editor/[funnelPageId]/_components/funnel-editor";

const Page = async (props: { params: Promise<{ domain: string; path: string }> }) => {
  const params = await props.params;
  //projects er khetre ekhane chage hobe
  const domainWithoutPort = params.domain.split(":")[0];
  const domainName = domainWithoutPort.split(".")[0];
  const domainData = await getDomainContent(domainName);
  const pageData = domainData?.FunnelPages.find((page) => page.pathName === params.path);

  if (!pageData || !domainData) return notFound();

  return (
    <EditorProvider
      agencyId={domainData.userId}
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
