"use client";
import { Button } from "@/components/ui/button";
import { Google } from "@/icons";
import { Loader } from "./Loader";
import { Git_login, Goo_login } from "../../../server/auth";
import { FaGithub } from "react-icons/fa";

export const AuthButton = () => {
  return (
    <div className="flex flex-col space-y-4">
      <form action={Goo_login}>
        <Button
          className="w-full rounded-full flex gap-3 !py-5 bg-themeBlack border-themeGray"
          variant="outline"
          type="submit"
        >
          <Loader loading={false}>
            <Google />
            Google
          </Loader>
        </Button>
      </form>
      <form action={Git_login}>
        <Button
          className="w-full rounded-full flex gap-3 !py-5 bg-themeBlack border-themeGray"
          variant="outline"
          type="submit"
        >
          <Loader loading={false}>
            <FaGithub size={16}/>
            GitHub
          </Loader>
        </Button>
      </form>
    </div>
  );
};
