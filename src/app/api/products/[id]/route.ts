import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    let { id } = params;
    const oneTemplate = await db.template.findUnique({
      where: { id },
      include: {
        FunnelPages: true,
        Reviews: {
          include: {
            User: {
              select: {
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
        User: {
          select: {
            name: true,
            avatarUrl: true
          }
        }
      },
    });    

    return NextResponse.json(oneTemplate);
  } catch (error) {
    console.error("Error in fetching", error);
    return NextResponse.json({ error: "Error in fetching for show one template" }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const { title, description, longDescription, theme, category, access, price, platform, feature, image, file } = await req.json();
    if (category.length < 5 || feature.length < 3) return NextResponse.json({ error: "Error in creating the templates" }, { status: 500 });
    await db.template.update({ where: { id }, data: { title, description, longDescription, theme, category, access, price, platform, feature, image, file } });
    return NextResponse.json({ message: "Template updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error in updating the template" }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    let { id } = params;
    await db.template.delete({ where: { id } });
    return NextResponse.json({ message: "Template deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
  }
};
