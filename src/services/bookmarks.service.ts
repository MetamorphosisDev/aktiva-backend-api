import { db } from "../config/db";
import { bookmarksTable } from "../config/schema";
import { eq, and } from "drizzle-orm";

// GET ALL BOOKMARKS BY USER
export const getUserBookmarks = async (userId: number) => {
  return await db
    .select()
    .from(bookmarksTable)
    .where(eq(bookmarksTable.userId, userId));
};

// GET BOOKMARK BY POST
export const getBookmarkByPost = async (
  userId: number,
  postId: number
) => {
  return await db
    .select()
    .from(bookmarksTable)
    .where(
      and(
        eq(bookmarksTable.userId, userId),
        eq(bookmarksTable.postId, postId)
      )
    );
};

// CREATE BOOKMARK
export const createBookmark = async (
  userId: number,
  postId: number
) => {
  return await db
    .insert(bookmarksTable)
    .values({
      userId,
      postId,
    });
};

// DELETE BOOKMARK
export const deleteBookmark = async (
  userId: number,
  postId: number
) => {
  return await db
    .delete(bookmarksTable)
    .where(
      and(
        eq(bookmarksTable.userId, userId),
        eq(bookmarksTable.postId, postId)
      )
    );
};