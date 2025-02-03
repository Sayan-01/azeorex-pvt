"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const DeleteBtn = ({ id }) => {
  const [load, setLoad] = useState(false);

  const router = useRouter();
  const remove = async () => {
    setLoad(true);
    await fetch(`/api/products/${id}`, { cache: "no-store", method: "DELETE" });
    router.refresh();
  };
  return (
    <Button
      onClick={remove}
      disisable={load.toString()}
      loadingBtn
      loadingText="Wait"
      size="lg"
      className="w-full items-center gap-2 px-2 rounded-[10px] border-2 bg-[#2d1c1f] hover:bg-[#e96079] border-[#e96079] text-[#e96079] hover:text-white"
    >
      {load ? (
        <>
          <Image
            src="/loading_circle.svg"
            width={20}
            height={20}
            className="mr-2 animate-spin"
          />
          Wait
        </>
      ) : (
        <>
          <FaTrashCan /> Delete
        </>
      )}
    </Button>
  );
};

export default DeleteBtn;
