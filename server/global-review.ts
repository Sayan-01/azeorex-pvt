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

export const getGlobalReviews = async () => {
  try {
    const reviews = await db.globalReview.findMany({
      orderBy: {
        createdAt: "desc",
      },
      // Since the user reverted the direct relation, we'll fetch users manually or just return reviews.
      // But let's check if we can actually use a manual join style or just return what we have.
    });

    // To show "all users", let's fetch user info for each review if available.
    const userIds = [...new Set(reviews.map((r) => r.userId))];
    const users = await db.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
      },
    });

    const reviewsWithUsers = reviews.map((review) => ({
      ...review,
      user: users.find((u) => u.id === review.userId),
    }));

    return reviewsWithUsers;
  } catch (error) {
    console.error("Error fetching global reviews:", error);
    return [];
  }
};
