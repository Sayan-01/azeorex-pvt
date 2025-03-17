import Heading from "@/components/design/Heading";
import BackdropGradient from "@/components/global/backdrop-gradient";
import GradientText from "@/components/global/gradient-text";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "@/icons";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  border: string;
  title: string;
  tag: React.ReactNode;
  color: string;
  features: [string, string, string, string, string];
};

export const PricingSection = () => {
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
          features={["Collaborate with up to 3 teammates", "Core task management features", "Unlimited projects and tasks", "Board and list views", "Basic integrations"]}
          border="border-zinc-400/10  bg-[#0a0d24] xl:scale-90"
          title="Free Plan"
          tag="$0 /"
          color="text-[#b4b0a3]"
        />
        <PriceCard
          features={["Collaborate with up to 3 teammates", "Core task management features", "Unlimited projects and tasks", "Board and list views", "Basic integrations"]}
          border="relative border-zinc-400/10 z-10  bg-[#402fb5]/50 pricing-shadow"
          title="Pro Plan"
          tag="$15 /"
          color="text-[#b4b0a3]"
        />
        <PriceCard
          features={["Collaborate with up to 3 teammates", "Core task management features", "Unlimited projects and tasks", "Board and list views", "Basic integrations"]}
          border="border-zinc-400/10 bg-[#0a0d24] xl:scale-90"
          title="Premium Plan"
          tag="$45 /"
          color="text-[#b4b0a3]"
        />
      </div>
    </div>
  );
};

const PriceCard = ({ border, title, tag, color, features }: Props) => {
  return (
    <Card className={clsx("p-8 mt-10 xl:w-[22rem] sm:w-[30rem] w-[18rem] rounded-[40px] border-2", border)}>
      <div className="flex flex-col gap-2 mb-8">
        <CardTitle className={clsx(color)}>{title}</CardTitle>
        <CardDescription className="my-5">
          <div className="flex items-end gap-2 mb-3">
            <div className="text-5xl text-white font-medium">{tag}</div>
            <div className="text-xl"> month</div>
          </div>
          <p className="text-[#B4B0AE]">Great if you’re just getting started</p>
        </CardDescription>
        <Link
          href="#"
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
      <Separator className={tag === "$15 /" ? "bg-white/10" : ""} />
      <div className={clsx("flex flex-col gap-2 mt-5", tag === "$15 /" ? "text-white" : "text-[#d3cfcd]")}>
        <p>Features</p>
        {features.map((i, idx) => (
          <span
            className="flex gap-2 mt-2 items-center"
            key={idx}
          >
            <Check />
            {i}
          </span>
        ))}
      </div>
    </Card>
  );
};
