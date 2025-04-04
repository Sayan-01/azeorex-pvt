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
    return { success: true, data: CMS }
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
  return { success: true, data: allCMS };
}

export const getCollection = async (id: string) => {
  try {
    const collection = await db.cMSCollection.findUnique({
      where: { id },
      include: {
        fields: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { items: true },
        },
      },
    })
    
    if (!collection) {
      return { success: false, error: 'Collection not found' }
    }
    
    return { success: true, data: collection }
  } catch (error) {
    console.error(`Failed to fetch collection ${id}:`, error)
    return { success: false, error: 'Failed to fetch collection' }
  }
}

export async function deleteCollection(id: string) {
  try {
    await db.cMSCollection.delete({
      where: { id },
    })
    
    return { success: true }
  } catch (error) {
    console.error(`Failed to delete collection ${id}:`, error)
    return { success: false, error: 'Failed to delete collection' }
  }
}