import { Outfit } from "next/font/google";

const outfi = Outfit({ subsets: ["latin"], weight: "400" });

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {

  return <div className={`relative w-full overflow-x-hidden select-none ${outfi.className}`}>{children}</div>;
};

export default LandingPageLayout;
