import React from "react";
import { getAllCMSCollection } from "../../../../../../server/cms";
import Infobar from "./_components/infobar";
import Sidebar from "./_components/sidebar";
import { CMSField } from "@prisma/client";

const CMSLayout = async ({ params, cmsId, children}: { params: { projectId: string }; cmsId: string; children: React.ReactNode }) => {
  const items = await getAllCMSCollection(params.projectId);

  return (
    <div className="flex flex-col h-screen border-l ml-6 bg-bcgc-editor text-white">
      <Infobar projectId={params.projectId} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          items={items}
          projectId={params.projectId}
        />
        {children}
      </div>
    </div>
  );
};

export default CMSLayout;
