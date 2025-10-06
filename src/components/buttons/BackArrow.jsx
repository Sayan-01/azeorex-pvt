"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

const BackArrow = ({className}) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div
      className={`${className}`}
      onClick={handleBackClick}
    >
      <IoMdArrowBack size={25} />
    </div>
  );
};

export default BackArrow;
