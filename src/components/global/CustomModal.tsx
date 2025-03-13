'use client'
import React from "react";
import { useModal } from "../../../providers/model-provider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

type Props = { title?: string; subheading?: string; children: React.ReactNode; defaultOption?: boolean };

const CustomModal = ({ title, subheading, children, defaultOption }: Props) => {
  const {isOpen, setClose} = useModal()
  return (
    <Dialog
      open={isOpen || defaultOption}
      onOpenChange={setClose}
    >
      <DialogContent className="overflow-scroll md:max-h-[700px] sm:h-fit h-screen bg-[#191a1d] border-none max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
        <DialogHeader className=" text-left">
          {title ? <DialogTitle className="pb-2">{title}</DialogTitle> : <></>}
          {subheading ? <DialogDescription className="!mb-5">{subheading}</DialogDescription> : <></>}
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
