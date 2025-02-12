import { Outfit } from "next/font/google";

const outfitt = Outfit({ subsets: ["latin"] });

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={`relative w-full overflow-x-hidden ${outfitt.className}`}>{children}</div>;
};

export default LandingPageLayout;
