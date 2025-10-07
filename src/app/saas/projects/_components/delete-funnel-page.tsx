"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteFunnelePage } from "@/lib/queries";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DeleteButton from "@/components/buttons/DeleteButton";
import { toast } from "sonner";

interface DeleteFunnelPageProps {
  funnelPageId: string;
}

export const DeleteFunnelPage = ({ funnelPageId }: DeleteFunnelPageProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // Dialog state
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteFunnelePage(funnelPageId);
      toast.success("Deleted!", { description: "Funnel page deleted successfully" });
      router.refresh(); // table refresh after delete
      setOpen(false); // close dialog after delete
    } catch (error) {
      console.error(error);
      toast.error( "Error",{ description: "Could not delete funnel page" });
    } finally {
      setLoading(false); // stop loading at the end
    }
  };

  return (
    <DeleteButton
      className={"flex-1"}
      onClick={handleDelete}
      title="Delete Funnel Page"
      description="Are you sure you want to delete this funnel page?"
      loading={loading}
    >
      <Button className="outline-none border-none ">
        <Trash size={15} /> Delete Page
      </Button>
    </DeleteButton>
  );
};
