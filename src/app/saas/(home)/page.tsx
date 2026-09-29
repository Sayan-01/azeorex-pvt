import { getProjects } from "@/lib/queries";
import { auth } from "../../../../auth";
import HomeComponent from "./_components/home-component";
import Unauthorized from "@/components/unauthorized";

import { db } from "@/lib/db";

async function getTemplates() {
  let res = await fetch(`${process.env.NEXT_URL}api/products`);
  res = await res.json();
  return res;
}

const Home = async () => {
  const session = await auth();
  const funnels = await getProjects(session?.user?.id);
  if (!funnels || !session?.user?.id) return <Unauthorized/>;
  const { templates }:any = await getTemplates();
  
  const user = await db.user.findUnique({ where: { id: session?.user?.id } });
  
  return (
    <HomeComponent
      funnels={funnels}
      templates={templates}
      userId={session?.user?.id}
      plan={user?.activePlan}
    />
  );
};

export default Home;
