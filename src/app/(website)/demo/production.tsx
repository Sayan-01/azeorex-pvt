import EditorProvider from "../../../../providers/editor/editor-provider";
import FunnelEditor from "../agency/[agencyId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor";
import FunnelEditorNavigation from "../agency/[agencyId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor-navigation";
import FunnelEditorSidebar from "../agency/[agencyId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor-sidebar";

const Production = async () => {
  const funnelPageDetails = {
    id: "123",
    name: "azeorex-demo",
    pathName: "landing-page",
    createdAt: 123,
    updatedAt: 123,
    visits: 0,
    content: "",
    order: 2,
    previewImage: null,
    funnelId: "aa9404c2-9e20-4692-b760-94eec9d53863",
  } as any;

  return (
    <div className="fixed top-0 bottom-0 border-x border-main-az left-0 right-0 z-20 bg-zinc-950 overflow-hidden">
      {/* starts from 16:39 */}
      <EditorProvider
        agencyId={"4e299a1c-4ea3-4267-bdbc-91fd68b45518"}
        funnelId={"aa9404c2-9e20-4692-b760-94eec9d53863"}
        pageDetails={funnelPageDetails}
      >
        <FunnelEditorNavigation
          funnelId={"aa9404c2-9e20-4692-b760-94eec9d53863"}
          funnelPageDetails={funnelPageDetails}
          agencyId={"4e299a1c-4ea3-4267-bdbc-91fd68b45518"}
        />
        <div className="h-full flex justify-center ">
          <FunnelEditor funnelPageId={"56d65436-8836-46ad-8091-6daad8feb5c6"} />
        </div>
        <FunnelEditorSidebar agencyId={"4e299a1c-4ea3-4267-bdbc-91fd68b45518"} />
      </EditorProvider>
    </div>
  );
};

export default Production;
