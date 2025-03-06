'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/global/CustomModal";
import CreateFunnelPage from "@/components/forms/funnel-page-form-project";
import clsx from "clsx";
import { useModal } from "../../../../../providers/model-provider";

const FunnelPageCreateBtn = ({ userId, projectId, length, className }: { userId: string; projectId: string; length: number; className?: string }) => {
  const { setOpen } = useModal();

  return (
    <Button
      size="sm"
      className={clsx(" bg-blue-500 hover:bg-blue-500/80 text-white hover:text-white ", className)}
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
