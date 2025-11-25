import React from "react";
import { CreditProvider } from "@/hooks/credit-provider";
import MobilePrevent from "@/components/global/mobile-view-prevent";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MobilePrevent>
      <CreditProvider>{children}</CreditProvider>
    </MobilePrevent>
  );
};

export default layout;
