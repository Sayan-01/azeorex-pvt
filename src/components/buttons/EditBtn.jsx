import Link from "next/link";
import React from "react";
import Button from "./Button";
import { FaRegPenToSquare } from "react-icons/fa6";

const EditBtn = ({ id }) => {
  return (
    <Link
      href={`/templates/edit/${id}`}
      className="w-full"
    >
      <Button
        loadingBtn
        loadingText=""
        size="lg"
        className="w-full h-10 items-center gap-2 px-2 rounded-[10px] border-2 bg-[#6460f5]/10 hover:bg-[#6460f5] border-[#6460f5] text-[#6460f5] hover:text-white"
      >
        <FaRegPenToSquare /> Edit
      </Button>
    </Link>
  );
};

export default EditBtn;
