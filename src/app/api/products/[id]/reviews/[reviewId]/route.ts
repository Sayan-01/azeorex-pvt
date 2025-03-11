import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const DELETE = async (req:Request,{ params }: { params: { reviewId: string } }) => {

  try {
    await db.review.delete({
      where: { id: params.reviewId },
    });
    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting review" });
  }
};
