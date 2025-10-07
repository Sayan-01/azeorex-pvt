"use client";
import CustomModal from "@/components/global/CustomModal";
import { PenSquare, PlusIcon } from "lucide-react";
import { useModal } from "../../../providers/model-provider";
import AddCMSFieldForm from "../forms/cms/add-cms-field-form";
import { Button } from "../ui/button";

const AddCMSFieldBtn = ({ collectionId, className }: { collectionId: string; className?: string }) => {
  const { setOpen } = useModal();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1 bg-zinc-800 rounded-xl h-[36px] text-zinc-100/80"
      onClick={() => {
        setOpen(
          <CustomModal width="w-[420px]">
            <AddCMSFieldForm collectionId={collectionId} />
          </CustomModal>
        );
      }}
    >
      <PenSquare className="h-4 w-4" />
      <span>Edit Fields</span>
    </Button>
  );
};

export default AddCMSFieldBtn;
