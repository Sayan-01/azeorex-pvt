import React from "react";
import Production from "./production";
import Dev from "./dev";


const page = () => {
  return <>{process.env.mode === "PRODUCTION" ? <Production /> : <Dev />}</>;
};

export default page;
