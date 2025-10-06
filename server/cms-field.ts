"use server";
import { db } from "@/lib/db";
import { FieldType } from "@prisma/client";
import { v4 } from "uuid";
type CreateFieldInput = {
  name: string;
  type: FieldType;
  required?: boolean;
  defaultValue?: string;
  options?: Record<string, any>;
};

export const createCMSField = async (collectionId: string, data: any) => {
  try {

    const field = await db.cMSField.create({
      data: {
        id: v4(),
        name: data.name,
        type: data.type,
        isRequired: data.required || false,
        order: data.order || 0,
        collectionId,
      },
    });

    return { success: true, data: field };
  } catch (error) {
    console.error("Failed to create field:", error);
    return { success: false, error: "Failed to create field" };
  }
};

// Get all fields for a collection
export async function getAllCMSFields(collectionId: string) {
  try {
    const fields = await db.cMSField.findMany({
      where: { collectionId },
      orderBy: { order: "asc" },
    });

    return { success: true, data: fields };
  } catch (error) {
    console.error(`Failed to fetch fields for collection ${collectionId}:`, error);
    return { success: false, error: "Failed to fetch fields" };
  }
}

// Get a field by ID
export async function getCMSField(id: string) {
  try {
    const field = await db.cMSField.findUnique({
      where: { id },
    });

    if (!field) {
      return { success: false, error: "Field not found" };
    }

    return { success: true, data: field };
  } catch (error) {
    console.error(`Failed to fetch field ${id}:`, error);
    return { success: false, error: "Failed to fetch field" };
  }
}

// Update a field
export async function updateCMSField(id: string, data: Partial<CreateFieldInput>) {
  try {
    const currentField = await db.cMSField.findUnique({
      where: { id },
      select: { collectionId: true },
    });

    if (!currentField) {
      return { success: false, error: "Field not found" };
    }

    const field = await db.cMSField.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.type && { type: data.type }),
        ...(data.required !== undefined && { required: data.required }),
        ...(data.defaultValue !== undefined && { defaultValue: data.defaultValue }),
        ...(data.options && { options: data.options }),
      },
    });

    return { success: true, data: field };
  } catch (error) {
    console.error(`Failed to update field ${id}:`, error);
    return { success: false, error: "Failed to update field" };
  }
}

// Delete a field
export async function deleteField(id: string) {
  try {
    const field = await db.cMSField.findUnique({
      where: { id },
      select: { collectionId: true },
    });

    if (!field) {
      return { success: false, error: "Field not found" };
    }

    await db.cMSField.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error(`Failed to delete field ${id}:`, error);
    return { success: false, error: "Failed to delete field" };
  }
}
