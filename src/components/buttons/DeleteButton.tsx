import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  children: React.ReactNode;
  onClick: () => any;
  title: string;
  description: string;
  loading: boolean;
};
const DeleteButton = ({ children, onClick, title, description, loading }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-[#191a1d] border-none outline-none rounded-[22px] gap-0  p-0 sm:w-[360px] w-[300px]">
        <AlertDialogHeader className="border-b p-4 flex items-center">
          <AlertDialogTitle className="text-base font-normal">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-center">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="p-4">
          <AlertDialogCancel className="bg-[#272727] w-full text-xs rounded-xl sm:mt-0 mt-3">Cancel</AlertDialogCancel>
          <Button
            onClick={onClick}
            className="bg-[#fd5b5d] hover:bg-[#fd5b5ed6] w-full text-xs rounded-xl text-white"
          >
            {loading ? (
              <LoaderCircle
                size={16}
                className="mr-2 animate-spin"
              />
            ) : (
              <p>Delete</p>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
