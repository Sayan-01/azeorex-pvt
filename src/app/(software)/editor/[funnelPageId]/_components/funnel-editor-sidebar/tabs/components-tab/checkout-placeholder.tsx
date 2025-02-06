import { EditorBtns } from "@/types/types";
import { Bitcoin } from "lucide-react";
import Image from "next/image";
import React from "react";

const CheckoutPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "paymentForm")}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Bitcoin
        strokeWidth={1.1}
        size={40}
        className="text-muted-foreground"
      />
    </div>
  );
};

export default CheckoutPlaceholder;
