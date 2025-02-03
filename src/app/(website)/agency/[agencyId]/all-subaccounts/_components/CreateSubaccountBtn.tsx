"use client";
import SubAccountDetails from "@/components/forms/Subaccount_form";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useModal } from "../../../../../../../providers/model-provider";
import CustomModal from "@/components/global/CustomModal";
import { Agency, SubAccount, User } from "@prisma/client";

type Props = {
  user: User & {
    Agency:
      | (
          | Agency
          | (null & {
              SubAccount: SubAccount[];
            })
        )
      | null;
  };
  id: string;
  className: string;
};

const CreateSubaccountButton = ({ className, user }: Props) => {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;  

  if (!agencyDetails) return;

  return (
    <Button
      className={twMerge("w-full flex gap-4", className)}
      onClick={() => {
        console.log(agencyDetails);
        
        setOpen(
          <CustomModal
            title="Create a Subaccount"
            subheading="You can switch bettween"
          >
            <SubAccountDetails
              agencyDetails={agencyDetails}
              userId={user.id}
              userName={user.name}
            />
          </CustomModal>
        );
      }}
    >
      <PlusCircleIcon size={15} />
      Create Sub Account
    </Button>
  );
};

export default CreateSubaccountButton;
