import { eq, and } from "drizzle-orm";
import { db } from "../config/db";

import {
  bookmarksTable,
  postsTable,
  categoriesTable,
} from "../config/schema";

// GET ALL BOOKMARKS BY USER
export const getUserBookmarks = async (userId: number) => {
  return await db
    .select({
      bookmarkId: bookmarksTable.id,
      postId: postsTable.id,
      title: postsTable.title,
      summary: postsTable.summary,
      coverImage: postsTable.coverImage,
      category: categoriesTable.categoryName,
      createdAt: bookmarksTable.createdAt,
    })
    .from(bookmarksTable)
    .leftJoin(
      postsTable,
      eq(bookmarksTable.postId, postsTable.id)
    )
    .leftJoin(
      categoriesTable,
      eq(postsTable.categoryId, categoriesTable.id)
    )
    .where(
      and(
        eq(bookmarksTable.userId, userId),
        eq(postsTable.status, "published")
      )
    );
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