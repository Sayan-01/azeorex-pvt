import React from "react";
import TemplateComponent from "./_components/template-component";

import { auth } from "../../../../auth";
import { db } from "@/lib/db";

async function getTemplates() {
  let res = await fetch(`${process.env.NEXT_URL}api/products`, {cache: "no-store"});
  res = await res.json();
  return res;
}

const page = async () => {
  const session = await auth();
  const { templates }: any = await getTemplates();
  
  let plan = "Free Plan";
  if (session?.user?.id) {
    const user = await db.user.findUnique({ where: { id: session.user.id } });
    plan = user?.activePlan || "Free Plan";
  }
  
  return <TemplateComponent templates={templates} plan={plan} />;
};

export default page;
