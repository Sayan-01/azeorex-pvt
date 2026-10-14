import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { initialElements } from "../../../../../providers/editor/editor-types";

export const maxDuration = 60;

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const projectId = formData.get("projectId") as string;
    const userId = formData.get("userId") as string;
    const funnelPageId = formData.get("funnelPageId") as string;

    if (!projectId || !userId || !funnelPageId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const [currPlan, countOfProjects] = await Promise.all([
      db.user.findUnique({
        where: { id: userId },
        select: { activePlan: true },
      }),
      db.project.count({
        where: { userId },
      }),
    ]);

    if (currPlan?.activePlan === "Free Plan" && countOfProjects >= 1) {
      return NextResponse.json(
        { success: false, message: "You are on free plan and you can create only 1 project" },
        { status: 400 }
      );
    }

    if (currPlan?.activePlan === "Pro Plan" && countOfProjects >= 5) {
      return NextResponse.json(
        { success: false, message: "You are on pro plan and you can create only 5 projects" },
        { status: 400 }
      );
    }

    await db.project.create({
      data: {
        id: projectId,
        name: "Untitled",
        description: "Untitled",
        subDomainName: projectId,
        liveProducts: "",
        userId,
        FunnelPages: {
          create: {
            id: funnelPageId,
            name: "Untitled Page",
            order: 0,
            pathName: "",
            published: false,
            content: JSON.stringify(initialElements),
          },
        },
      },
    });

    return NextResponse.json(
      { success: true, message: "Project created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("ai-project-create error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to create project" },
      { status: 500 }
    );
  }
};
