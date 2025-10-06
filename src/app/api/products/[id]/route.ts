import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const oneTemplate = await db.template.findUnique({
      where: { id },
      include: {
        User: { select: { name: true, avatarUrl: true } },
        FunnelPages: true,
      },
    });

    return NextResponse.json(oneTemplate);
  } catch (error) {
    console.error("Error in fetching", error);
    return NextResponse.json({ error: "Error in fetching for show one template" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { title, description, longDescription, theme, category, access, price, platform, feature, image, file } = await req.json();

    if (category.length < 5 || feature.length < 3) {
      return NextResponse.json({ error: "Error in creating the templates" }, { status: 400 });
    }

    await db.template.update({
      where: { id },
      data: { title, description, longDescription, theme, category, access, price, platform, feature, image, file },
    });

    return NextResponse.json({ message: "Template updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating template:", error);
    return NextResponse.json({ error: "Error in updating the template" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await db.template.delete({ where: { id } });
    return NextResponse.json({ message: "Template deleted successfully" });
  } catch (error) {
    console.error("Error deleting template:", error);
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
  }
}
