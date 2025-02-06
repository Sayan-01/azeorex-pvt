import BlurPage from "@/components/global/blur-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFunnel, getProject } from "@/lib/queries";
import Link from "next/link";
import { redirect } from "next/navigation";
import FunnelSteps from "../_components/funnel-stapes";
import { auth } from "../../../../../auth";


type Props = { params: { projectId: string } };
const FunnelPage = async ({ params }: Props) => {
  const session = await auth()
  const funnelId = params.projectId
  const agencyId = session?.user?.id || ""
  const funnelPages = await getProject(funnelId);
  
  if (!funnelPages) return redirect(`/agency/${agencyId}/funnels`);

  return (
    <BlurPage>
      <div className="flex gap-2 my-4  items-center">
        <Link
          href={`/agency/${agencyId}/funnels`}
          className="flex justify-between gap-4 text-muted-foreground"
        ></Link>
        <h1 className="text-3xl">{funnelPages.name}</h1>
      </div>
      <Tabs
        defaultValue="steps"
        className="w-full"
      >
        <TabsList className="grid  grid-cols-2 w-[50%] bg-transparent ">
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="steps">
          <FunnelSteps
            funnel={funnelPages}
            agencyId={agencyId}
            pages={funnelPages.FunnelPages}
            funnelId={funnelId}
          />
        </TabsContent>
        <TabsContent value="settings">
          <div>ggg</div>
        </TabsContent>
      </Tabs>
    </BlurPage>
  );
};

export default FunnelPage;
