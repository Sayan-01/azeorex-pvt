import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={`relative w-full overflow-x-hidden ${outfit.className}`}>{children}</div>;
};

export default LandingPageLayout;
