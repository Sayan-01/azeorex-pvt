import { getProjects } from "@/lib/queries";
import { auth } from "../../../auth";
import HomeComponent from "./_components/home-component";

const Home = async () => {
  const session = await auth();
  const funnels = await getProjects(session?.user?.id);
  if (!funnels || !session?.user?.id) return null;

  return (
    <HomeComponent funnels={funnels} userId={session?.user?.id}/>
  );
};

export default Home;