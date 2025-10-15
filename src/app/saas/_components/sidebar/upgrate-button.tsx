'use client'
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PricingSection } from "@/app/(landing)/_components/pricing";
import { Button } from "@/components/ui/button";

const UpgrateButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-main hover:bg-main/80 text-white"
          size="sm"
        >
          Upgrate
        </Button>
      </DialogTrigger>
      <DialogContent>
        <PricingSection />
      </DialogContent>
    </Dialog>
  );
};

export default UpgrateButton;
