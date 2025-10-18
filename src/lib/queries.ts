"use server";

import { CreateFunnelFormSchema, CreateMediaType, Warframe } from "@/types/types";
import { FunnelPage, User } from "@prisma/client";
import { v4 } from "uuid";
import { success, z } from "zod";
import { auth } from "../../auth";
import { db } from "./db";
import { sendOtpViaNodeMailer } from "./sendOtpViaNodeMailer";

//============================================================

export const getUserDetails = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user && !session) {
    return;
  }

  const userData = await db.user.findUnique({
    where: {
      email: user?.email as string,
    },
  });

  return userData;
};

//=============================================================

export const updateUser = async (data: any, id: string) => {
  const response = await db.user.update({
    where: { id: id },
    data: { ...data },
  });

  return response;
};

//=============================================================

export const IsUserEmailExist = async (email: string) => {
  const response = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (response) return true;
  else return false;
};

//===============================================================================

export const deleteProject = async (projectId: string) => {
  const response = await db.project.delete({
    where: {
      id: projectId,
    },
  });

  return response;
};

//==============================================================================

export const getProject = async (projectId: string) => {
  const project = await db.project.findUnique({
    where: { id: projectId },
    include: {
      FunnelPages: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return project;
};

//=============================================================================

export const getProjects = async (userId: string | undefined) => {
  if (userId === undefined) return;
  const projects = await db.project.findMany({
    where: { userId: userId },
    include: { FunnelPages: true },
    orderBy: { updatedAt: "desc" },
  });

  return projects;
};

//===============================================================================

export const upsertProject = async (userId: string, project: z.infer<typeof CreateFunnelFormSchema> & { liveProducts: string }, projectId: string, currPlan: string) => {
  try {
    if (project.subDomainName) {
      const existingProject = await db.project.findFirst({
        where: { subDomainName: project.subDomainName },
      });
      if (existingProject) {
        return {success:false, message:"Subdomain already exists, please enter another subdomain name."};
      }
    }

    if (currPlan === "Free Plan") {
      const countOfProjects = await db.project.count({
        where: { userId: userId },
      });
      if (countOfProjects >= 1) {
        return {success:false, message:"You are on free plan and you can create only 1 project"};
      }
    }

    if (currPlan === "Pro Plan") {
      const countOfProjects = await db.project.count({
        where: { userId: userId },
      });
      if (countOfProjects >= 5) {
        return {success:false, message:"You are on pro plan and you can create only 5 projects"};
      }
    }

    const response = await db.project.upsert({
      where: { id: projectId },
      update: project,
      create: {
        ...project,
        id: projectId || v4(),
        userId: userId,
      },
    });

    return { success: true, data: response };
  } catch (error: any) {
    console.error("Error upserting project:", error);
    return {success:false, message:error.message || "Failed to upsert project. Please try again later."};
  }
};

//==============================================================================

export const upsertFunnelPage = async (agencyId: string, funnelPage: any, funnelId: string) => {
  if (!agencyId || !funnelId) return;
  const response = await db.funnelPage.upsert({
    where: { id: funnelPage.id || "" },
    update: { ...funnelPage },
    create: {
      ...funnelPage,
      content: funnelPage.content
        ? funnelPage.content
        : JSON.stringify([
            {
              content: [],
              id: "__body",
              name: "Body",
              styles: { backgrondColor: "#f8f8f8" },
              type: "__body",
            },
          ]),
      funnelId,
    },
  });

  return response;
};

export const upsertFunnelPageForProject = async (funnelPage: any, projectId: string) => {
  if (!projectId) return;
  const response = await db.funnelPage.upsert({
    where: { id: funnelPage.id || "" },
    update: { ...funnelPage },
    create: {
      id: funnelPage.id,
      name: funnelPage.name || "Untitled Page",
      order: funnelPage.order ?? 0,
      pathName: funnelPage.pathName || "",
      content: funnelPage.content
        ? funnelPage.content
        : JSON.stringify([
            {
              content: [],
              id: "__body",
              name: "Body",
              styles: { backgroundColor: "#fdfdfd" },
              type: "__body",
            },
          ]),
      projectId,
    },
  });

  await db.project.update({
    where: { id: projectId },
    data: { updatedAt: new Date() },
  });

  return response;
};

//==============================================================================

export const createWarframe = async (warframe: Warframe) => {
  const response = await db.warframeObj.create({
    data: {
      id: warframe.id,
      warframe_name: warframe.warframe_name,
      warframe_image: warframe.warframe_image,
      warframe: warframe.warframe,
    },
  });

  return response;
};

//==============================================================================

export const findWarframe = async () => {
  const response = await db.warframeObj.findMany({
    orderBy: {
      warframe_name: "asc",
    },
  });
  return response;
};

//==============================================================================

export const deleteWarframe = async (warframeId: string) => {
  const response = await db.warframeObj.delete({
    where: {
      id: warframeId,
    },
  });
  return response;
};

//==============================================================================

export const getFunnelPageDetails = async (funnelPageId: string) => {
  const response = await db.funnelPage.findUnique({
    where: {
      id: funnelPageId,
    },
  });

  return response;
};

export const deleteFunnelePage = async (funnelPageId: string) => {
  const response = await db.funnelPage.delete({
    where: {
      id: funnelPageId,
    },
  });
  return response;
};

//============================================================================

export const getDomainContent = async (subDomainName: string) => {
  const response = await db.project.findUnique({
    where: {
      subDomainName,
    },
    include: { FunnelPages: true },
  });
  return response;
};

//=============================================================================

export const deleteMedia = async (mediaId: string) => {
  const response = await db.media.delete({
    where: {
      id: mediaId,
    },
  });
  return response;
};

//=============================================================================

export const createMedia = async (agencyId: string, mediaFile: CreateMediaType) => {
  const response = await db.media.create({
    data: {
      link: mediaFile.link,
      name: mediaFile.name,
      projectId: agencyId,
    },
  });

  return response;
};

//=========================================================================

export const getMedia = async (agencyId: string) => {
  const mediafiles = await db.project.findUnique({
    where: {
      id: agencyId,
    },
    include: { Media: true },
  });
  return mediafiles;
};

//=============================================================================

export const sendCodeThroughNodemailer = async (email: string, username: string, otp: string) => {
  const emailRes = await sendOtpViaNodeMailer(email, username, otp);
  if (emailRes) {
    return { success: true, message: "Email error is", status: 200 };
  } else return { success: false, message: "Email error is", status: 500 };
};

//===========================================================================

export const searchSimilerProduct = async (category: string) => {
  const similer_product = await db.template.findMany({
    where: {
      category: { has: category },
    },
    orderBy: {
      datePublished: "desc",
    },
    include: {
      User: {
        select: {
          name: true,
          avatarUrl: true,
        },
      },
      Reviews: true,
    },
    take: 6,
  });
  if (similer_product) return similer_product;
  else return [];
};

//============================================================================

export const temToProject = async (template: any) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!template) return null;

  const project = await db.project.create({
    data: {
      id: v4(),
      name: template.title,
      description: template.description,
      subDomainName: `${template.title.toLowerCase()}-${Math.floor(1000 + Math.random() * 9000).toString()}`,
      userId: userId as string,
    },
  });

  const copiedFunnelPages = template.FunnelPages.map((page: FunnelPage) => ({
    id: v4(),
    name: page.name,
    pathName: page.pathName,
    content: page.content,
    previewImage: page.previewImage,
    order: page.order,
    projectId: project.id,
  }));

  const res = await db.funnelPage.createMany({ data: copiedFunnelPages });

  if (res) {
    return { success: true, message: "Purchased successfully!", status: 200 };
  } else return { success: false, message: "Server error", status: 500 };
};

export const deleteReview = async (reviewId: string) => {
  await db.review.delete({
    where: { id: reviewId },
  });
};

export async function getUserCurrentPlan(userId: string) {
  const subscription = await db.subscription.findFirst({
    where: {
      userId,
      active: true,
    },
    select: {
      plan: true,
      currentPeriodEndDate: true,
    },
  });

  if (!subscription) {
    // No active subscription found
    return {
      plan: "FREE",
      expiresOn: null,
    };
  }

  return {
    plan: subscription.plan,
    expiresOn: subscription.currentPeriodEndDate,
  };
}

export const updateDomainName = async (projectId: string, subDomainName: string | null) => {
  if (!projectId || !subDomainName) return;

  if (subDomainName) {
    const existingProject = await db.project.findFirst({
      where: { subDomainName },
    });
    if (existingProject) {
      throw new Error("Subdomain already exists, please enter another subdomain name.");
    }
  }
  const response = await db.project.update({
    where: { id: projectId },
    data: { subDomainName },
  });

  return response;
};
