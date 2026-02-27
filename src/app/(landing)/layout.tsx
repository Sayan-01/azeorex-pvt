import { LenisOptions } from "lenis";
import ReactLenis from "lenis/react";
import { Outfit } from "next/font/google";

const outf = Outfit({ subsets: ["latin"], weight: "400" });

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  const lenisOptions: LenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // A common easing function
    smoothWheel: true,
    // Add other options as needed
  };
  return (
    <ReactLenis root>
      <div className={`relative w-full overflow-x-hidden select-none ${outf.className}`}>{children}</div>
    </ReactLenis>
  );
};

export default LandingPageLayout;
