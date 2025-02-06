import React from "react";
import { Git_login, Goo_login } from "../../../server/auth";
import { Google } from "@/icons";
import { FaGithub } from "react-icons/fa";


const Socials = () => {
  return (
    <div className="flex flex-col space-y-4 mb-8">
      <form action={Git_login}>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-[8px] h-10 font-medium shadow-input bg-[#10122C] dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <FaGithub size={18} className=" text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">GitHub</span>
          <BottomGradient />
        </button>
      </form>
      <form action={Goo_login}>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-[8px] h-10 font-medium shadow-input bg-[#10122C] dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <Google />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">Google</span>
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default Socials;
