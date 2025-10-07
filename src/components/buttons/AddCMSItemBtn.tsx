import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { getAllCMSFields } from "../../../server/cms-field";
import AddCMSItemForm from "../forms/cms/add-cms-item-form";

const AddCMSItemBtn = ({ collectionId, className }: { collectionId: string; className?: string }) => {

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="ghost"
          size="sm"
          className=" flex items-center gap-1 bg-zinc-800 rounded-xl h-[36px] text-zinc-100/80"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Item</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#191a1d]">
        <AddCMSItemForm collectionId={collectionId} />
      </SheetContent>
    </Sheet>
  );
};

export default AddCMSItemBtn;
