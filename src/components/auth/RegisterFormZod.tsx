"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../validators/auth-validator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { SubmitButton } from "../buttons/SubmitBtn";
import Socials from "./Socials";
import { Paytone_One } from "next/font/google";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { generateVerificationToken } from "@/utils/token";
import { IsUserEmailExist, sendCodeThroughNodemailer } from "@/lib/queries";


const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [preEmail, setPreEmail] = useState("");
  const [preOtp, setPreOtp] = useState("");
  const [expires, setExpires] = useState<Date | null>();
  const [code, setCode] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      otp: "",
    },
  });

  const getCode = async () => {
    setCode(true);
    const email = form.getValues("email"); // Get the email value
    const username = form.getValues("username"); // Get the username value
    const checkUserEmailExist = await IsUserEmailExist(email);
    if (checkUserEmailExist) {
      setCode(false);
      return setError("Email already exist");
    }
    if (!email) {
      setError("Please enter your email first.");
      setCode(false);
      return;
    }
    setPreEmail(email);
    setError("");
    const { otp, expires } = await generateVerificationToken();
    //send verification email
    const emailRes = await sendCodeThroughNodemailer(email, username, otp);
    if (emailRes.status != 200) {
      setCode(false);
      return setError("Something was wrong via send email");
    }
    setPreOtp(otp);
    setExpires(expires);
  };

  const onSubmit = async (values: { username: string; email: string; password: string; otp: string }) => {
    setLoading(true); // Set loading to true
    const username = await values.username;
    const email = await values.email;
    const password = await values.password;
    const otp = await values.otp;

    if (!username || !email || !password || !otp) return setError("Filled all details");
    if (email !== preEmail) return setError("Email does not match");
    if (otp !== preOtp) return setError("OTP does not match");
    else {
      try {
        let res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ ...values, expires }),
        });
        let data = await res.json();
        if (res.ok) {
          setSuccess(data.message);
          setLoading(false); // Set loading to false
          redirect("/auth/login");
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
    <div className="z-20 sm:w-[310px] w-[300px] ">
      <div className="flex flex-col justify-center mb-6">
        <h2 className={` text-[30px] text-neutral-800 dark:text-neutral-200 `}>Welcome!</h2>
        <p className="-mb-2 text-sm opacity-60">Login into Azeorex to continue</p>
      </div>
      
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 my-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <LabelInputContainer className={"mb-4"}>
                  
                  <FormControl>
                    <Input
                      className="rounded-xl h-[42px] border-zinc-800 border placeholder:opacity-40"
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
                  <FormControl>
                    <Input
                      className="rounded-xl h-[42px] border-zinc-800 border placeholder:opacity-40"
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
                      className="rounded-xl h-[42px] border-zinc-800 border tracking-[6px] placeholder:opacity-40"
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
          <div className="flex items-start gap-4 !-mt-1">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Input
                      className="rounded-xl h-[42px] border-zinc-800 border tracking-[6px] !overflow-hidden placeholder:opacity-40"
                      type="text "
                      maxLength={6}
                      placeholder="######"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              onClick={code ? undefined : getCode}
              className={` cursor-pointer h-[42px] border border-zinc-800 text-white/60 rounded-xl text-sm inline-flex items-center justify-center whitespace-nowrap px-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-900 ${
                code ? "opacity-30 hover:!bg-zinc-800" : "border-zinc-800 "
              }`}
            >
              Send code
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2 mt-[5px] ">
                <RadioGroupItem
                  className=" rounded-sm border-zinc-800 border"
                  value="default"
                  id="r1"
                />
              </div>
            </RadioGroup>

            <div className="text-sm text-neutral-500">
              I confirm that I have read and agree to the Azeorex's{" "}
              <a
                href="https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Terms of Use
              </a>{" "}
              &{" "}
              <a
                href="https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Privacy Policy
              </a>
              .
            </div>
          </div>
          <div className={`mb-4 ${error ? "text-red-500 text-[0.8rem] font-medium" : " text-emerald-500 text-[0.8rem] font-medium"} `}>{error ? error : success}</div>

          <SubmitButton
            className="bg-[#bebebe] border-x relative group/btn block w-full text-black rounded-[8px] h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] py-0 text-base"
            disable_className="bg-[#bebebe]  border-x w-full text-black rounded-[8px] h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-base"
            loading={loading}
          >
            Sign up &rarr;
            <BottomGradient />
          </SubmitButton>
          <h4 className="text-blue-100/80 mt-4 text-center text-sm">
            Already have an acoount?{" "}
            <span className=" text-blue-600">
              <Link href={`/auth/login`}>Login</Link>
            </span>
          </h4>
        </form>
      </Form>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-6 h-[1.5px] w-full" />
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

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

export default RegisterForm;
