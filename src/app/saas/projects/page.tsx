import { getProjects } from "@/lib/queries";
import { auth } from "../../../../auth";
import ProjectComponent from "../_components/project-component";

const page = async () => {
  const session = await auth();
  const funnels = await getProjects(session?.user?.id);
  if (!funnels || !session?.user?.id) return null;

  return (
    <ProjectComponent
      funnels={funnels}
      userId={session?.user?.id}
    />
  );
};
export default page;
