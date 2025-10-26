import { db } from "@/lib/db";
import { getDomainContent } from "@/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import Editor from "../playground/_components/editor";
import { EditorProvider } from "../../../providers/editor/editor-provider";
import { NewEditorProvider } from "../../../providers/newPeovider";

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

  let code = pageData.content;
  code = code
    .replace(/```html/, "")
    .replace(/```/, "")
    .trim();

  return (
    <EditorProvider
      agencyId={domainData.id}
      pageDetails={pageData}
      funnelId={domainData.id}
    >
      <NewEditorProvider>
      <Editor
        isLive={true}
        code={code}
      />
      </NewEditorProvider>
    </EditorProvider>
  );
};

export default Page;
