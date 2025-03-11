import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const templateId = params.id;

    if (!templateId) {
      return NextResponse.json({ error: "Template ID is required" }, { status: 400 });
    }

    const reviews = await db.review.findMany({
      where: { templateId },
      include: { User: { select: { id: true, name: true, avatarUrl: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const { comment, rating, templateId } = await req.json();
  try {
    const newReview = await db.review.create({
      data: {
        comment,
        rating,
        templateId,
        userId: session?.user?.id,
      },
      include: { User: { select: { name: true, avatarUrl: true, id: true } } },
      
    });
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating review" }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  console.log("enter", params.id);

  try {
    const data = await db.review.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting review" });
  }
};
