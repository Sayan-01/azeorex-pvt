"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/global/CustomModal";
import CreateFunnelPage from "@/components/forms/funnel-page-form-project";
import clsx from "clsx";
import { useModal } from "../../../providers/model-provider";
import { PlusIcon } from "lucide-react";
import AddCMSCollectionForm from "../forms/cms/add-cms-collection-form";

const AddCMSBtn = ({ projectId, className }: { projectId: string; className?: string }) => {
  const { setOpen } = useModal();

  return (
    <div className="flex items-center py-2 px-3 rounded-xl cursor-pointer">
      <div
        className="flex items-center gap-2 text-sm text-zinc-400/80"
        onClick={() => {
          setOpen(
            <CustomModal width="w-[420px]">
              <AddCMSCollectionForm projectId={projectId} />
            </CustomModal>
          );
        }}
      >
        <PlusIcon className="h-4 w-4" />
        <span>Add...</span>{" "}
      </div>
    </div>
  );
};

export default AddCMSBtn;
