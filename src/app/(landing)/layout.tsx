import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: "400" });

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {

  return <div className={`relative w-full overflow-x-hidden select-none ${outfit.className}`}>{children}</div>;
};

export default LandingPageLayout;
