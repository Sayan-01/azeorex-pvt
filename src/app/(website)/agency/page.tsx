import { redirect } from "next/navigation";
import React from "react";
import { auth } from "../../../../auth";
import { getUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import AgencyForm from "@/components/forms/agency-form";
import Unauthorized from "@/components/unauthorized";

const page = async () => {
  const session = await auth();
  if (!session?.user) redirect("/agency/sign-in");

  const agencyId = await verifyAndAcceptInvitation();

  console.log(agencyId);

  const user = await getUserDetails();

  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect("/subaccount");
    } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      return redirect(`/agency/${agencyId}`);
    } else {
      return (
        <div>
          <Unauthorized />
        </div>
      );
    }
  }

  return (
    <div className="flex justify-center items-center my-4">
      <div className=" max-w-[850px]  p-4 rounded-xl">
        <h1 className="text-4xl w-ful text-center  mb-8 ">Create An Agency</h1>
        <AgencyForm data={{ companyEmail: session?.user?.email as string }} />
      </div>
    </div>
  );
};

export default page;
