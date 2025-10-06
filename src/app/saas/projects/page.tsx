import { getProjects } from "@/lib/queries";
import { auth } from "../../../../auth";
import ProjectComponent from "./_components/project-component";
import Unauthorized from "@/components/unauthorized";

const Home = async () => {
  const session = await auth();
  const funnels = await getProjects(session?.user?.id);
  if (!funnels || !session?.user?.id) return <Unauthorized/>;

  return (
    <ProjectComponent
      funnels={funnels}
      userId={session?.user?.id}
    />
  );
};

export default Home;
