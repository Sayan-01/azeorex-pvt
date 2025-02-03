'use client'
import React from "react";
import { useModal } from "../../../providers/model-provider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

type Props = { title: string; subheading: string; children: React.ReactNode; defaultOption?: boolean };

const CustomModal = ({ title, subheading, children, defaultOption }: Props) => {
  const {isOpen, setClose} = useModal()
  return (
    <Dialog
      open={isOpen || defaultOption}
      onOpenChange={setClose}
    >
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
