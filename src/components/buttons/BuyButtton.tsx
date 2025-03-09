"use client";
import { temToProject } from "@/lib/queries";
import { Template } from "@prisma/client";
import React, { useState } from "react";
import { Loader } from "../global/Loader";
import { useToast } from "@/hooks/use-toast";

type Props = {
  oneTemplate: Template;
};

const BuyButtton = ({ oneTemplate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const templateToProject = async () => {
    setLoading(true);
    try {
      let data = await temToProject(oneTemplate);
      if (data?.status !== 200) return toast({ variant: "destructive", description: "Something went wrong, try again" });
      toast({
        description: "✨Template purchased successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong, try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`w-full ${loading ? " bg-main/40" : "bg-main"}  h-[40px] text-white rounded-lg flex items-center justify-center font-lg`}
      onClick={templateToProject}
    >
      {loading ? <Loader loading /> : "Buy now"}
    </button>
  );
};

export default BuyButtton;
