"use server";
import { db } from "@/lib/db";
import { v4 } from "uuid";

type ItemInput = {
  [key: string]: string | number | boolean | string[] | null;
};

// Create a new item in a collection
export async function createCMSItem(collectionId: string, data: ItemInput) {
  try {
    // Step 1: Create CMSItem
    const cmsItem = await db.cMSItem.create({
      data: {
        id: v4(),
        collectionId,
      },
    });

    // Step 2: Prepare FieldValue records
    const fieldValueData = Object.entries(data).map(([fieldId, rawValue]) => {
      let value: string;

      if (typeof rawValue === "boolean") {
        value = rawValue ? "true" : "false";
      } else if (Array.isArray(rawValue)) {
        value = rawValue.join(","); // For MULTI_SELECT
      } else {
        value = String(rawValue);
      }

      return {
        id: v4(),
        value,
        fieldId,
        itemId: cmsItem.id,
      };
    });

    console.log(fieldValueData);
    

    // Step 3: Insert all FieldValues
    const newer = await db.fieldValue.createMany({
      data: fieldValueData,
    });
    console.log(newer);
    

    return { success: true, itemId: cmsItem.id };
  } catch (error) {
    console.error("Error saving CMS item:", error);
    return { success: false, error: "Failed to save CMS item" };
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