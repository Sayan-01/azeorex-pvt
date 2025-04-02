"use server";

import { db } from "@/lib/db";
import { v4 } from "uuid";

export const addCMSCOllection = async (cmsName: string, projectId: string) => {
  try {
    const CMS = await db.cMSCollection.create({
      data: {
        id: v4(),
        name: cmsName,
        projectId,
      },
    });
    return CMS;
  } catch (error) {
    return { success: false, message: "Email error is", status: 500 };
  }
};

export const getAllCMSCollection = async (projectId: string) => {
  if (!db || !db.cMSCollection) {
    throw new Error("Database client is not initialized or CMSCollection model is incorrect.");
  }
  
  const allCMS = await db.cMSCollection.findMany({
    where: {
      projectId,
    },
  });
  return allCMS;
}