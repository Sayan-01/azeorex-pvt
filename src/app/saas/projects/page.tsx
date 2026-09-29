import { getProjects } from "@/lib/queries";
import { auth } from "../../../../auth";
import ProjectComponent from "./_components/project-component";
import Unauthorized from "@/components/unauthorized";

import { db } from "@/lib/db";

const Home = async () => {
  const session = await auth();
  const funnels = await getProjects(session?.user?.id);
  if (!funnels || !session?.user?.id) return <Unauthorized/>;

  const user = await db.user.findUnique({ where: { id: session?.user?.id } });

  return (
    <ProjectComponent
      funnels={funnels}
      userId={session?.user?.id}
      plan={user?.activePlan}
    />
  );
};

export default Home;
