import { getDomainContent } from "@/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import Editor from "@/app/playground/_components/editor";
import { EditorProvider } from "../../../../providers/editor/editor-provider";
import { WebsiteBuilder } from "@/app/playground/_components/website-builder";

const Page = async (props: { params: Promise<{ domain: string; path: string }> }) => {
  const params = await props.params;
    const domainWithoutPort = params.domain.split(":")[0];
  const domainName = domainWithoutPort.split(".")[0];
  const domainData = await getDomainContent(domainName);
  const pageData = domainData?.FunnelPages.find((page) => page.pathName === params.path);

  if (!pageData?.content || !domainData) return notFound();

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
