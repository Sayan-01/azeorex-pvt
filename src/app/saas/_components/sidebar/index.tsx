import React from "react";
import SidebarComp from "./sidebar-comp";

const Sidebar = () => {
  return (
    <>
      <SidebarComp defaultOption={true} />
      <SidebarComp />
    </>
  );
};

export default Sidebar;
