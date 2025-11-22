import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "../../../../auth";
import { v4 } from "uuid";
import { FunnelPage } from "@prisma/client";

export const GET = async () => {
  try {
    const templates = await db.template.findMany({
      orderBy: { datePublished: "asc" },
      include: {
        User: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
        Reviews: true
      },
    });
    return NextResponse.json({ templates });
  } catch (error) {
    return NextResponse.json({ error: "Error in fetching the templates" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  try {
    const { title, description, longDescription, theme, category, access, price, platform, feature, image, file, FunnelPages } = await req.json();

    if (category.length < 5 || feature.length < 2) {
      return NextResponse.json({ error: "category and feature length should be greater than 5 and 3 respectively" }, { status: 400 });
    }

    const template = await db.template.create({
      data: {
        id: v4(),
        title,
        description,
        longDescription,
        theme,
        category,
        access,
        price,
        platform: [platform],
        feature,
        image,
        file,
        userId: session.user.id, // Ensured userId is always a string
      },
    });    

    const copiedFunnelPages = FunnelPages.map((page:FunnelPage) => ({
      id: v4(),
      name: page.name,
      pathName: page.pathName,
      content: page.content,
      previewImage: page.previewImage,
      order: page.order,
      templateId: template.id, // Link new pages to the Template
    }));

    await db.funnelPage.createMany({ data: copiedFunnelPages });

    return NextResponse.json({ message: "Template added successfully" }, { status: 201 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: "Error in creating the template" }, { status: 500 });
  }
};

