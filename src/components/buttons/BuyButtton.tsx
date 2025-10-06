"use client";
import { temToProject } from "@/lib/queries";
import { Template } from "@prisma/client";
import React, { useState } from "react";
import { Loader } from "../global/Loader";
import { useToast } from "@/hooks/use-toast";
import buyProduct from "../../../server/buyProduct-stripe";

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
    // <button
    //   className={`w-full ${loading ? " bg-main/40" : "bg-main"}  h-[40px] text-white rounded-lg flex items-center justify-center font-lg`}
    //   // onClick={templateToProject}
    //   onClick={() => {

    //   }}
    // >
    //   {loading ? <Loader loading /> : "Buy now"}
    // </button>
    <form
      className="w-full"
      action={buyProduct}
    >
      <input
        type="hidden"
        name="id"
        value={oneTemplate.id}
      />
      <button
        type="submit"
        className="flex gap-5 w-full"
      >
        <div className=" bg-blue-600 h-[40px] text-white rounded-lg flex items-center justify-center flex-1 font-lg ">Buy now</div>
      </button>
    </form>
  );
};

export default BuyButtton;
