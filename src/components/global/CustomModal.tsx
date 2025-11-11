"use client";
import React from "react";
import { useModal } from "../../../providers/model-provider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import clsx from "clsx";

type Props = { title?: string; subheading?: string; children: React.ReactNode; defaultOption?: boolean; width?: string , className?: string};

const CustomModal = ({ title, subheading, children, defaultOption, width = "sm:w-[500px] w-[320px]" , className}: Props) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog
      open={isOpen || defaultOption}
      onOpenChange={setClose}
    >
      <DialogContent className={clsx(`overflow-x-hidden box md:max-h-[700px] border-none max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center `, width, className)}>
        <DialogHeader className=" text-left w-full">
          {title ? <DialogTitle className="pb-2">{title}</DialogTitle> : <></>}
          {subheading ? <DialogDescription className="!mb-5">{subheading}</DialogDescription> : <></>}
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
