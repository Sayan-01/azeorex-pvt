"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useModal } from "../../../../../providers/model-provider";
import CustomModal from "@/components/global/CustomModal";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/forms/project-form";

type Props = {
  className?: string;
  userId: string | undefined;
  children?: React.ReactNode;
};

const CreateProjectButton = ({ className, userId, children }: Props) => {
  const { setOpen } = useModal();
  if (userId === undefined) return redirect("/sign-in");

  return (
    <Button
      size="sm"
      className={twMerge("bg-blue-500 hover:bg-blue-500/80 text-white w-28", className)}
      onClick={() => {
        setOpen(
          <CustomModal>
            <ProjectForm/>
          </CustomModal>
        );
      }}
    >
      {children ? children : <p>+ Create New</p>}
    </Button>
  );
};

export default CreateProjectButton;
