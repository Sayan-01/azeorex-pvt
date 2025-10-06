import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import Button from "../buttons/Button";
import Link from "next/link";

const AfterPaymentCard = ({ success, heading, subHeading, btnText, url }) => {
  return (
    <div className="w-[600px] py-8 rounded-xl border-[#1c1c41] bg-[#0d002e71] border p-6 flex items-center justify-center flex-col">
      <div className="mb-6">
        {success ? (
          <div>
            <FaRegCircleCheck color="#eeeeee" />
          </div>
        ) : (
          <div className="p-3 bg-red-300/50 rounded-full">
            <MdOutlineCancel
              color="red"
              size={40}
            />
          </div>
        )}
      </div>
      <h1 className="font-semibold text-2xl mb-4">{heading}</h1>
      <p className="text-center mb-5">{subHeading}</p>
      <Link href={`${process.env.NEXT_URL}`}>
        <Button
          bigBlue
          className="w-full py-4"
        >
          {btnText}
        </Button>
      </Link>
    </div>
  );
};

export default AfterPaymentCard;
