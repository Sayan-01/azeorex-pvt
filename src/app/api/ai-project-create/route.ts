import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const projectId = formData.get("projectId") as string;
    const userId = formData.get("userId") as string;
    const funnelPageId = formData.get("funnelPageId") as string;
    const messages = formData.get("messages") as  string  ;

    await db.project.create({
      data: {
        id: projectId,
        name: "Untitled",
        description: "Untitled",
        subDomainName: projectId,
        userId,   
      },
    });

    await db.funnelPage.create({
      data: {
        id: funnelPageId,
        name: "Untitled",
        pathName: "/",
        order: 0,
        content:  JSON.stringify([
            {
              content: [],
              id: "__body",
              name: "Body",
              styles: { backgrondColor: "#f8f8f8" },
              type: "__body",
            },
          ]),
        projectId,
      },
    });

    const chat = await db.chat.create({
      data: {
        chatMessage: messages,
        userId,
        projectId,
        funnelPageId
      },
    });
    console.log(chat);
    return NextResponse.json({projectId, funnelPageId, messages});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

//complete