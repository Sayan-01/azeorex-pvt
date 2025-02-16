"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../validators/auth-validator.ts";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import Socials from "./Socials";
import { SubmitButton } from "../buttons/SubmitBtn";
// import { Input } from "../ui/input.jsx";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true); // Set loading to true
    const username = await values.username;
    const email = await values.email;
    const password = await values.password;

    if (!username || !email || !password) return setError("Filled all details");
    else {
      try {
        let res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(values),
        });
        let data = await res.json();
        if (res.ok) {
          setSuccess(data.message);
          router.push(`/auth/verify/${username}`);
          // setLoading(false); // Set loading to false
        } else if (!res.ok) {
          setLoading(false); // Set loading to false
          setError(data.message);
        }
      } catch (error) {
        console.log("Error in sign up", error);
        setLoading(false); // Set loading to false
      }
    }
  };

  return (
    <div className="z-20 w-full sm:pt-[95px] pt-[75px] ">
      <div className="max-w-md w-full mx-auto  rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black/60">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome to Azeorex - Register</h2>
        {/* <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 my-8 mb-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <LabelInputContainer className={"mb-4"}>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </LabelInputContainer>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <LabelInputContainer className={"mb-4"}>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="youremail@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </LabelInputContainer>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <LabelInputContainer className={"mb-6"}>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="**********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </LabelInputContainer>
                </FormItem>
              )}
            />
            <div className={`mb-4 ${error ? "text-red-500 text-[0.8rem] font-medium" : " text-emerald-500 text-[0.8rem] font-medium"} `}>{error ? error : success}</div>
            <SubmitButton
              className="bg-[#bebebe] border-x relative group/btn block w-full text-black rounded-[8px] h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] py-0 text-base"
              disable_className="bg-[#bebebe]  border-x w-full text-black rounded-[8px] h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-base"
              loading={loading}
            >
              Sign up &rarr;
              <BottomGradient />
            </SubmitButton>
            <h4 className="text-blue-100/80 mt-4 text-center">
              Already have an acoount?{" "}
              <span className=" text-blue-600 underline">
                <Link href={`/auth/login`}>Login</Link>
              </span>
            </h4>
          </form>
        </Form> */}
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <Socials />
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
