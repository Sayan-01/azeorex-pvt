import React from "react";
import TemplateComponent from "./_components/template-component";
import { toast } from "sonner";

async function getTemplates() {
  let res = await fetch(`${process.env.NEXT_URL}api/products`, {cache: "no-store"});
  if (!res.ok) toast("Server error");
  res = await res.json();
  return res;
}

const page = async () => {
  const { templates }: any = await getTemplates();
  
  return <TemplateComponent templates={templates} />;
};

export default page;
