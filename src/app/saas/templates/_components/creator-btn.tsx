import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { MoveRight } from "lucide-react";
import React from "react";

const CreatorBtn = ({ className }: { className?: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          className={"bg-blue-500 hover:bg-blue-500/80 text-white items-center flex gap-2"}
        >
          Became a creator <MoveRight size={15} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit profile</AlertDialogTitle>
          <AlertDialogDescription>Make changes to your profile here. Click save when you're done.</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          
        </div>
        <AlertDialogFooter>
          <Button type="submit">Save changes</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreatorBtn;
