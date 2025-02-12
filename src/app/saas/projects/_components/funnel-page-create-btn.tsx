import React from "react";
import { useModal } from "../../../../../providers/model-provider";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/global/CustomModal";
import CreateFunnelPage from "@/components/forms/funnel-page-form-project";

const FunnelPageCreateBtn = ({userId, projectId,length}:{userId:string, projectId:string, length: number}) => {
  const { setOpen } = useModal();

  return (
    <Button
    size="sm"
      className="top-[22px] bg-blue-500 hover:bg-blue-500/80 text-white hover:text-white absolute right-5 "
      onClick={() => {
        setOpen(
          <CustomModal
            title=" Create or Update a Funnel Page"
            subheading="Funnel Pages allow you to create step by step processes for customers to follow"
          >
            <CreateFunnelPage
              userId={userId}
              projectId={projectId}
              order={length}
            />
          </CustomModal>
        );
      }}
    >
      + Create New Page
    </Button>
  );
};

export default FunnelPageCreateBtn;
