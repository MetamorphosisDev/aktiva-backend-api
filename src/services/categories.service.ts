import { db } from "../config/db";
import { categoriesTable } from "../config/schema";
import { eq } from "drizzle-orm";

// GET ALL CATEGORIES
export const getAllCategories = async () => {
  return await db
    .select()
    .from(categoriesTable);
};

// GET CATEGORY BY ID
export const getCategoryById = async (id: number) => {
  return await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.id, id));
};

// CREATE CATEGORY
export const createCategory = async (
  slug: string,
  categoryName: string,
  categoryDescription?: string
) => {
  return await db
    .insert(categoriesTable)
    .values({
      slug,
      categoryName,
      categoryDescription,
    });
};

// UPDATE CATEGORY
export const updateCategory = async (
  id: number,
  slug: string,
  categoryName: string,
  categoryDescription?: string
) => {
  return await db
    .update(categoriesTable)
    .set({
      slug,
      categoryName,
      categoryDescription,
    })
    .where(eq(categoriesTable.id, id));
};

// DELETE CATEGORY
export const deleteCategory = async (id: number) => {
  return await db
    .delete(categoriesTable)
    .where(eq(categoriesTable.id, id));
};