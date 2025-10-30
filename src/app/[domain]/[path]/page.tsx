import { getDomainContent } from "@/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import Editor from "@/app/playground/_components/editor";
import { EditorProvider } from "../../../../providers/editor/editor-provider";

const Page = async (props: { params: Promise<{ domain: string; path: string }> }) => {
  const params = await props.params;
  //projects er khetre ekhane chage hobe
  const domainWithoutPort = params.domain.split(":")[0];
  const domainName = domainWithoutPort.split(".")[0];
  const domainData = await getDomainContent(domainName);
  const pageData = domainData?.FunnelPages.find((page) => page.pathName === params.path);

  if (!pageData?.content || !domainData) return notFound();

  let code = pageData.content;
  code = code
    .replace(/```html/, "")
    .replace(/```/, "")
    .trim();
  return (
    <EditorProvider
      userId={domainData.userId}
      projectId={domainData.id}
      funnelPageDetails={pageData}
    >
      <Editor
        isLive={true}
        code={code}
      />
    </EditorProvider>
  );
};

export default Page;
