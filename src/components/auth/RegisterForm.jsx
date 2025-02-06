"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { Label } from "../ui/label_ace";
import { Input } from "../ui/input_ace";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Git_login, Goo_login } from "../../../server/login";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (formData) => {
    const username = await formData.get("username");
    const email = await formData.get("email");
    const password = await formData.get("password");
    if (!username || !email || !password) return setError("Filled all details");
    let res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });

    let data = await res.json();
    if (!res.ok) setError(data.message);
    if (res.ok) setSuccess(data.message);
    if (res.ok) router.push("/auth/login");
  };

  return (
    <div className="z-20 w-full sm:pt-[95px] pt-[75px] ">
      <div className="max-w-md w-full mx-auto  rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black/60">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome to Glowren - Register</h2>
        <form
          className="my-8 mb-4"
          action={handleSubmit}
          noValidate
        >
          <LabelInputContainer className={"mb-4"}>
            <Label htmlFor="username">username</Label>
            <Input
              name="username"
              placeholder="Tyler Durben"
              type="text"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              name="email"
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className={error ? "mb-4" : `mb-8`}>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>
          <div className={`mb-4 ${error ? "text-red-400" : " text-emerald-500"} `}>{error ? error : success}</div>

          <button
            className="bg-[#10122C] border-x relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
          <h4 className="text-blue-100/80 mt-4 text-center">
            Already have an acoount?{" "}
            <span className=" text-blue-600 underline">
              <Link href={`/auth/login`}>Login</Link>
            </span>
          </h4>
        </form>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4 mb-8">
          <form action={Git_login}>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-[#10122C] dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">GitHub</span>
              <BottomGradient />
            </button>
          </form>
          <form action={Goo_login}>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-[#10122C] dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">Google</span>
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
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

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

export default RegisterForm;
