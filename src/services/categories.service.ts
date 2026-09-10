import { db } from "../config/db";
import { categoriesTable } from "../config/schema";

// GET ALL CATEGORIES
export const getAllCategories = async () => {
  return await db
    .select()
    .from(categoriesTable);
};