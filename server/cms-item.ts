"use server";
import { db } from "@/lib/db";
import { v4 } from "uuid";

type ItemInput = {
  [key: string]: string | number | boolean | string[] | null;
};

export async function createCMSItem(collectionId: string, data: ItemInput) {
  try {
    const cmsItem = await db.item.create({
      data: {
        id: v4(),
        collectionId,
        values:data,
      },
    });    
    return { success: true, itemId: cmsItem.id };
  } catch (error) {
    console.error("Error saving CMS item:", error);
    return { success: false, error: "Failed to save CMS item" };
  }
}

export async function getAllItems(collectionId: string) {
  try {
    // Get all items in the collection
    const items = await db.item.findMany({
      where: { collectionId },
    });

    return { success: true, data: items };
  } catch (error) {
    console.error("Error fetching CMS items:", error);
    return { success: false, error: "Failed to fetch CMS items" };
  }
}