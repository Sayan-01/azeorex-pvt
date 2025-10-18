import { getProjects } from "@/lib/queries";
import { auth } from "../../../../auth";
import HomeComponent from "./_components/home-component";
import Unauthorized from "@/components/unauthorized";
import { toast } from "sonner";

async function getTemplates() {
  let res = await fetch(`${process.env.NEXT_URL}api/products`);
  if (!res.ok) toast("Server error");
  res = await res.json();
  return res;
}

const Home = async () => {
  const session = await auth();
  const funnels = await getProjects(session?.user?.id);
  if (!funnels || !session?.user?.id) return <Unauthorized/>;
  const { templates }:any = await getTemplates();
  
  return (
    <HomeComponent
      funnels={funnels}
      templates={templates}
      userId={session?.user?.id}
    />
  );
};

export default Home;
