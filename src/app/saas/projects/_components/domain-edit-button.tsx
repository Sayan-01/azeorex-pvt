"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateDomainName } from "@/lib/queries";
import { Pen, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DomainEditButton = ({ projectId }: { projectId: string }) => {
  const [subDomainName, setSubDomainName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!subDomainName.trim()) {
      toast.error("Please enter a valid domain name");
      return;
    }

    try {
      setLoading(true);
      await updateDomainName(projectId, subDomainName.trim());
      toast.success("Domain name updated successfully 🎉");
      setSubDomainName("");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update domain name");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:mt-5 mt-2.5 ml-3 p-1">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="p-2 rounded-md hover:bg-zinc-800/70 bg-zinc-800 transition-colors"
          >
            <Pen size={16} />
          </button>
        </DialogTrigger>

        <DialogContent x={false}>
          <DialogHeader>
            <DialogTitle>Edit Domain</DialogTitle>
            <DialogDescription>Enter a new subdomain for your project.</DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-3">
            <Input
              placeholder="Enter subdomain name"
              value={subDomainName}
              onChange={(e) => setSubDomainName(e.target.value)}
              disabled={loading}
            />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild> 
              <Button
              variant="outline"
              onClick={() => {setSubDomainName(""); setOpen(false)}}
              disabled={loading}
            >
              Cancel
            </Button>
            </DialogClose>
            
            <Button
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DomainEditButton;
