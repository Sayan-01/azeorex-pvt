import { Outfit } from "next/font/google";

const outf = Outfit({ subsets: ["latin"], weight: "400" });

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {

  return <div className={`relative w-full overflow-x-hidden select-none ${outf.className}`}>{children}</div>;
};

export default LandingPageLayout;
