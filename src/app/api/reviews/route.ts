import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export const POST = async (req: Request, res: Response) => {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }
  const { comment, rating, templateId } = await req.json();
  try {
    const reviews = await db.review.create({
      data: {
        comment,
        rating,
        templateId,
        userId: session?.user?.id,
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating review" }, { status: 500 });
  }
};
