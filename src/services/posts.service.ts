import { eq, and } from "drizzle-orm";

import { db } from "../config/db";

import {
  postsTable,
  usersTable,
  categoriesTable,
  bookmarksTable,
} from "../config/schema";

import {
  Post,
  CreatePost,
  UpdatePost,
} from "../types/posts.type";

// GET ALL
export const getAllPosts = async () => {
  return await db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      content: postsTable.content,
      summary: postsTable.summary,
      coverImage: postsTable.coverImage,
      images: postsTable.images,
      source: postsTable.source,
      location: postsTable.location,
      status: postsTable.status,
      viewCount: postsTable.viewCount,
      createdAt: postsTable.createdAt,
      updatedAt: postsTable.updatedAt,

      userId: postsTable.userId,
      author: usersTable.name,

      categoryId: postsTable.categoryId,
      category: categoriesTable.categoryName,
    })
    .from(postsTable)
    .leftJoin(
      usersTable,
      eq(postsTable.userId, usersTable.id)
    )
    .leftJoin(
      categoriesTable,
      eq(postsTable.categoryId, categoriesTable.id)
    );
};

// GET BY ID
export const getPostById = async (id: number) => {
  const post = await db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      content: postsTable.content,
      summary: postsTable.summary,
      coverImage: postsTable.coverImage,
      images: postsTable.images,
      source: postsTable.source,
      location: postsTable.location,
      status: postsTable.status,
      viewCount: postsTable.viewCount,
      createdAt: postsTable.createdAt,
      updatedAt: postsTable.updatedAt,

      userId: postsTable.userId,
      author: usersTable.name,

      categoryId: postsTable.categoryId,
      category: categoriesTable.categoryName,
    })
    .from(postsTable)
    .leftJoin(
      usersTable,
      eq(postsTable.userId, usersTable.id)
    )
    .leftJoin(
      categoriesTable,
      eq(postsTable.categoryId, categoriesTable.id)
    )
    .where(eq(postsTable.id, id));

  return post[0];
};

// CREATE || POST
export const createPost = async (data: CreatePost) => {
  return await db
    .insert(postsTable)
    .values(data);
};


// NOTE: DELETE AND UPDATE hanya bisa diedit sesuai userId

// UPDATE || PUT
export const updatePost = async (
  id: number,
  userId: number,
  data: UpdatePost
) => {
  return await db
    .update(postsTable)
    .set(data)
    .where(
      and(
        eq(postsTable.id, id),
        eq(postsTable.userId, userId)
      )
    );
};

// DELETE || DELETE
export const deletePost = async (
  id: number,
  userId: number
) => {
  // Hapus bookmark terlebih dahulu
  await db
    .delete(bookmarksTable)
    .where(eq(bookmarksTable.postId, id));

  // Baru hapus post
  return await db
    .delete(postsTable)
    .where(
      and(
        eq(postsTable.id, id),
        eq(postsTable.userId, userId)
      )
    );
};

// DELETE ALL || DELETE
export const deleteAllPosts = async () => {
  return await db
    .delete(postsTable);
};