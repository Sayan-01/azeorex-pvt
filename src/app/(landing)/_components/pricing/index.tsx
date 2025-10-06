import Heading from "@/components/design/Heading";
import BackdropGradient from "@/components/global/backdrop-gradient";
import GradientText from "@/components/global/gradient-text";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "@/icons";
import clsx from "clsx";
import Link from "next/link";
import { auth } from "../../../../../auth";
import { CheckCircle } from "lucide-react";

type Props = {
  border: string;
  title: string;
  tag: React.ReactNode;
  color: string;
  features: [string, string, string, string, string];
  link: string;
  user: any;
};

export const PricingSection = async () => {
  const session = await auth();
  return (
    <div
      className="w-full md:mt-40 flex flex-col items-center gap-y-5"
      id="pricing"
    >
      <Heading
        h3="-: pricing :-"
        h1="Pricing Plans For Saas"
        p="Discover innovative tools designed to optimize your workflows and drive success."
      />
      <div className="flex xl:flex-row flex-col gap-2">
        <PriceCard
          features={["You can create only 1 project.", "1000 creadits for AI tasks.", "Full access of SAAS website builder.", "Basic dashboard features.", "Basic SAAS editor."]}
          border="border-zinc-400/10  bg-[#0a0d24] xl:scale-90"
          title="Free Plan"
          tag="$0 /"
          color="text-[#b4b0a3]"
          link="/"
          user={session?.user}
        />
        <PriceCard
          features={["You can create only 5 projects.", "10000 creadits for AI tasks.", "Full access of SAAS website builder.", "Advanced dashboard features.", "Advanced SAAS editor."]}
          border="relative border-zinc-400/10 z-10  bg-[#402fb5]/50 pricing-shadow"
          title="Pro Plan"
          tag="$15 /"
          color="text-[#b4b0a3]"
          link="#"
          user={session?.user}
        />
        <PriceCard
          features={["You can create unlimited projects.", "100000 creadits for AI tasks.", "Full access of SAAS website builder.", "Advanced dashboard features.", "Advanced SAAS editor."]}
          border="border-zinc-400/10 bg-[#0a0d24] xl:scale-90"
          title="Premium Plan"
          tag="$49 /"
          color="text-[#b4b0a3]"
          link="#"
          user={session?.user}
        />
      </div>
    </div>
  );
};

const PriceCard = ({ border, title, tag, color, features, link, user }: Props) => {
  return (
    <Card className={clsx("p-8 mt-10 xl:w-[22rem] sm:w-[30rem] w-[18rem] rounded-[40px] border-2", border)}>
      <div className="flex flex-col gap-2 mb-8">
        <CardTitle className={clsx(color)}>{title}</CardTitle>
        <div className="my-5 text-sm text-muted-foreground">
          <div className="flex items-end gap-2 mb-3">
            <div className="text-5xl text-white font-medium">{tag}</div>
            <div className="text-xl"> month</div>
          </div>
          <p className="text-[#B4B0AE]">Great if you’re just getting started</p>
        </div>
        <Link
          href={user?.email ? link : "/auth/login"}
          className="w-full"
        >
          <Button
            variant="default"
            className="py-[22px] text-md font-semibold w-full rounded-xl btn-shadow mb-1"
          >
            Start your journey
          </Button>
        </Link>
        <p className="text-xs opacity-60 mx-auto">powered by azeorex company</p>
      </div>
      <Separator className={tag === "$15 /" ? "bg-gradient-to-r from-[#412fb576] via-[#d3cfcd76] to-[#402fb576]" : "bg-gradient-to-r from-[#412fb576] via-[#d3cfcd76] to-[#402fb576]"} />
      <div className={clsx("flex flex-col gap-2 mt-5", tag === "$15 /" ? "text-white" : "text-[#d3cfcd]")}>
        <p>Features</p>
        {features.map((i, idx) => (
          <span
            className="flex gap-2 mt-2 items-center"
            key={idx}
          >
            <CheckCircle className="text-[#80B53D]" size={17} strokeWidth={1.8}/>
            {i}
          </span>
        ))}
      </div>
    </Card>
  );
};
