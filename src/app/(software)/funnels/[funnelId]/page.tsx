import BlurPage from "@/components/global/blur-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFunnel } from "@/lib/queries";
import Link from "next/link";
import { redirect } from "next/navigation";
import FunnelSettings from "./_components/funnel-settings";
import FunnelSteps from "./_components/funnel-steps";

type Props = { params: { funnelId: string; agencyId: string } };

const FunnelPage = async ({ params }: Props) => {
  const funnelPages = await getFunnel(params.funnelId);
  if (!funnelPages) return redirect(`/agency/${params.agencyId}/funnels`);
  
  return (
    <BlurPage>
      <div className="flex gap-2 my-4  items-center">
        <Link
          href={`/agency/${params.agencyId}/funnels`}
          className="flex justify-between gap-4 text-muted-foreground"
        >
        </Link>
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
            agencyId={params.agencyId}
            pages={funnelPages.FunnelPages}
            funnelId={params.funnelId}
          />
        </TabsContent>
        <TabsContent value="settings">
          <FunnelSettings
            agencyId={params.agencyId}
            defaultData={funnelPages}
          />
        </TabsContent>
      </Tabs>
    </BlurPage>
  );
};

export default FunnelPage;
