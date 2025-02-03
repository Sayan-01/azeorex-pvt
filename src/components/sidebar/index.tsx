import { getUserDetails } from "@/lib/queries";
import React from "react";
import MenuOptions from "./MenuOptions";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

const Sidebar = async ({ id, type }: Props) => {
  const user = await getUserDetails();
  if (!user) return null;

  if (!user?.Agency) return;

  const details = user?.Agency;

  // let whiteLable = user?.Agency?.whiteLabel;
  let sidebarLogo = user?.Agency?.agencyLogo || "/azeorex.png";

  // if (!whiteLable) {
  //   if (type === "subaccount") {
  //     sidebarLogo = user?.Agency.SubAccount.find((subacc: any) => subacc.id === id)?.subAccountLogo || user.Agency.agencyLogo;
  //   }
  // }
  const sideBarOpt = user.Agency.SidebarOption || [];

  return (
    <>
      <MenuOptions
        type={type}
        defaultOption={true}
        sideBarOpt={sideBarOpt}
        sidebarLogo={sidebarLogo}
        details={details}
        user={user}
      />
      <MenuOptions
        type={type}
        details={details}
        sidebarLogo={sidebarLogo}
        sideBarOpt={sideBarOpt}
        user={user}
      />
    </>
  );
};

export default Sidebar;
