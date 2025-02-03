import { Outfit } from "next/font/google";

const xyz = Outfit({ subsets: ["latin"] });

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={`relative w-full overflow-x-hidden ${xyz.className}`}>{children}</div>;
};

export default LandingPageLayout;
