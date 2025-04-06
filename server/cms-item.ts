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

// Get all items in a collection
export async function getAllCMSItems(collectionId: string) {
  try {
    // Get all fields for this collection (for display)
    const fields = await db.cMSField.findMany({
      where: { collectionId },
      orderBy: { order: 'asc' },
    })
    
    // Get all items with their field values
    const items = await db.cMSItem.findMany({
      where: { collectionId },
      include: {
        values: {
          include: {
            field: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    
    // Format the items with their field values
    const formattedItems = items.map(item => {
      const formattedValues: Record<string, any> = {}
      
      item.values.forEach(value => {
        // Convert the string value back to the appropriate type
        let typedValue: any = value.value
        
        switch (value.field.type) {
          case 'NUMBER':
            typedValue = value.value ? parseFloat(value.value) : null
            break
          case 'BOOLEAN':
            typedValue = value.value === 'true'
            break
          case 'MULTI_SELECT':
            try {
              typedValue = JSON.parse(value.value)
            } catch {
              typedValue = []
            }
            break
        }
        
        formattedValues[value.field.id] = typedValue
      })
      
      return {
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        values: formattedValues,
      }
    })
    
    return { 
      success: true, 
      data: {
        items: formattedItems,
        fields,
      }
    }
  } catch (error) {
    console.error(`Failed to fetch items for collection ${collectionId}:`, error)
    return { success: false, error: 'Failed to fetch items' }
  }
}