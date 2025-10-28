import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "../../../../../auth";

interface SavePageRequest {
  funnelPageDetails: {
    id?: string;
    name?: string;
    pathName?: string;
    order?: number;
    // Add other funnel page properties as needed
    [key: string]: any;
  };
  content: string;
  projectId: string;
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { funnelPageDetails, content, projectId } = await req.json() as SavePageRequest;

    if (!funnelPageDetails || !content || !projectId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Verify user has access to this project
    const project = await db.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    });

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    // Update or create the funnel page
    const data = {
      ...funnelPageDetails,
      content,
      projectId,
      order: funnelPageDetails.order ?? 0, // Default order to 0 if not provided
    };

    const updatedPage = await db.funnelPage.upsert({
      where: {
        id: funnelPageDetails.id || "",
      },
      update: {
        ...funnelPageDetails,
        content,
        order: funnelPageDetails.order ?? 0,
      },
      create: {
        name: funnelPageDetails.name || "Untitled Page",
        order: funnelPageDetails.order ?? 0,
        pathName: funnelPageDetails.pathName || "",
        content: content || " ",
        projectId,
      },
    });

    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("[FUNNEL_PAGE_SAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
