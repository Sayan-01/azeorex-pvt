"use client";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { SubmitButton } from "../buttons/SubmitBtn";
import { loginSchema } from "../../../validators/auth-validator";
import { Input } from "../ui/input";
import Socials from "./Socials";
import { Paytone_One } from "next/font/google";

const pay = Paytone_One({ subsets: ["latin"], weight: "400" });

const LoginForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: any) => {
    setLoading(true); // Set loading to true
    const email = await values.email;
    const password = await values.password;

    if (!email || !password) {
      return setError("Filled all details");
    } else {
      try {
        let res = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(values),
        });
        let data = await res.json();
        if (res.ok) {
          router.refresh();
          setSuccess(data.message);
          setLoading(false); // Set loading to false
        } else {
          setLoading(false); // Set loading to false
          setError(data.message);
        }
      } catch (error) {
        console.log("Error in login", error);
        setLoading(false); // Set loading to false
      }
    }
  };
  return (
    <div className="z-20 sm:w-[310px] w-[100px] ">
      <div className="flex items-center justify-center">
        <h2 className={` text-[38px] text-neutral-800 dark:text-neutral-200 ${pay.className}`}>Azeorex</h2>
      </div>
      <p className="mt-5 text-sm opacity-60 text-center">Only login via email, Google, or 86 plus phone number login is supported in your region.</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 my-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <LabelInputContainer className={"mb-4"}>
                  <FormControl>
                    <Input
                      className="rounded-xl h-[42px] border-zinc-700 border-[1.7px]"
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
                  <FormControl>
                    <Input
                      className="rounded-xl h-[42px] border-zinc-700 border-[1.7px] tracking-[6px]"
                      type="password"
                      placeholder="@@@@@@"
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
            Login &rarr;
            <BottomGradient />
          </SubmitButton>
          <h4 className="text-blue-100/80 mt-4 text-center">
            Don't have an acoount?{" "}
            <span className=" text-blue-600 underline">
              <Link href={`/auth/register`}>Register</Link>
            </span>
          </h4>
        </form>
      </Form>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      <Socials />
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

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

export default LoginForm;
