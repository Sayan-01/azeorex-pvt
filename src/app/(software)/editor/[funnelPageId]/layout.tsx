import React from "react";
import { CreditProvider } from "@/hooks/credit-provider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <CreditProvider>{children}</CreditProvider>;
};

export default layout;
