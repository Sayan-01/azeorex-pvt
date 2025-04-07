"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/global/CustomModal";
import CreateFunnelPage from "@/components/forms/funnel-page-form-project";
import clsx from "clsx";
import { useModal } from "../../../../../providers/model-provider";

const FunnelPageCreateBtn = ({ userId, projectId, length, className }: { userId: string; projectId: string; length: number; className?: string }) => {
  const { setOpen } = useModal();

  return (
    <div
      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
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
      New Page
    </div>
  );
};

export default FunnelPageCreateBtn;
