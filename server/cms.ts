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
    return { success: true, data: CMS };
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
    include: {
      _count: {
        select: { Item: true },
      },
    },
  });
  return allCMS || [];
};

export const getAllCMSCollectionWithItems = async (projectId: string) => {
  if (!db || !db.cMSCollection) {
    throw new Error("Database client is not initialized or CMSCollection model is incorrect.");
  }

  const allCMS = await db.cMSCollection.findMany({
    where: {
      projectId,
    },
    include: {
      Item: true,
      _count: {
        select: { Item: true },
      },
    },
  });
  return allCMS || [];
};

export async function deleteCollection(id: string) {
  try {
    await db.cMSCollection.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error(`Failed to delete collection ${id}:`, error);
    return { success: false, error: "Failed to delete collection" };
  }
}
