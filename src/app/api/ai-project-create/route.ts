import { db } from "@/lib/db";
import { upsertFunnelPageForProject, upsertProject } from "@/lib/queries";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const projectId = formData.get("projectId") as string;
    const userId = formData.get("userId") as string;
    const funnelPageId = formData.get("funnelPageId") as string;
    const messages = formData.get("messages") as string;

    const project = await upsertProject(
      userId,
      {
        name: "Untitled",
        description: "Untitled",
        subDomainName: projectId,
        liveProducts: "",
      },
      projectId,
    );

    if (!project.success) {
      return NextResponse.json({ success: false, message: project.message }, { status: 400 });
    }

    await upsertFunnelPageForProject({ id: funnelPageId, name: "Untitled", pathName: "", order: 0 }, projectId);
    
    await db.chat.create({
      data: {
        chatMessage: JSON.parse(messages),
        userId,
        projectId,
        funnelPageId,
      },
    });

    return NextResponse.json({ success: true, message: "Project created successfully" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error?.message }, { status: 500 });
  }
};

//complete
