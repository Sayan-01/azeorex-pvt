"use client";
import React from "react";
import { Button } from "../ui/button";
import { useModal } from "../../../providers/model-provider";
import CustomModal from "../global/CustomModal";
import UploadMediaForm from "../forms/upload-media";
import UploadImageForm from "../forms/upload-image";

type Props = {
  projectId: string;
};

const ImageUploadeButton = ({ projectId }: Props) => {
  const { setOpen } = useModal();

  return (
    <div
      className="absolute bottom-2 left-2 rounded-md px-3 py-1 bg-zinc-400 border-2 border-zinc-500 z-[1002] text-xs"
      onClick={() => {
        setOpen(
          <CustomModal
            title="Upload Media"
            subheading="Upload a file to your media bucket"
          >
            <UploadImageForm projectId={projectId}/>
          </CustomModal>
        );
      }}
    >
      Upload
    </div>
  );
};

export default ImageUploadeButton;
