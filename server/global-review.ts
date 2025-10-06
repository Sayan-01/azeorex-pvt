"use server";

import { db } from "@/lib/db";

export const saveGlobalReview = async (globalReview: any, userId: string) => {

  try {
    const singleGlobalReview = await db.globalReview.create({
      data: {
        globalReview,
        userId,
      },
    });

    if (!singleGlobalReview) return { error: "Something was wrong" };
    else return { message: "Successfully review created" };
  } catch (error) {
    return { error: "Something was wrong" };
  }
};
