import BlurPage from "@/components/global/blur-page";
import InfoBar from "@/components/global/InfoBar";
import Sidebar from "@/components/sidebar";
import Unauthorized from "@/components/unauthorized";
import { verifyAndAcceptInvitation } from "@/lib/queries";
import { Role } from "@/types/types";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "../../../../../auth";

type Props = {
  children: React.ReactNode;
  params: { agencyId: string };
};

const layout = async ({ children, params }: Props) => {
  const session = await auth();
  const agencyId = await verifyAndAcceptInvitation();

  if (!session?.user) redirect("agency/sign-in");
  if (!agencyId) redirect("/agency");

  // @ts-expect-error: session.user.role might be undefined, and Role type comparison may throw a TypeScript error.
  if (session?.user?.role !== Role.AGENCY_ADMIN && session?.user?.role !== Role.AGENCY_OWNER) return <Unauthorized />;
  //=>TODO: notification

  return (
    <div className="h-screen overflow-x-hidden box ">
      <Sidebar
        id={params.agencyId}
        type="agency"
      />
      <div className="md:pl-[280px]">
        <InfoBar />
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
