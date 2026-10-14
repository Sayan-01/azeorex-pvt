import React from "react";
import { CreditProvider } from "@/hooks/credit-provider";
import MobilePrevent from "@/components/global/mobile-view-prevent";
import { auth } from "../../../../auth";
import { db } from "@/lib/db";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  let initialCredits = 0;
  if (session?.user?.id) {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true },
    });
    initialCredits = user?.credits ?? 0;
  }

  return (
    <MobilePrevent>
      <CreditProvider initialCredits={initialCredits}>{children}</CreditProvider>
    </MobilePrevent>
  );
};

export default layout;
