import { eq, and } from "drizzle-orm";

import { db } from "../config/db";
import { postsTable } from "../config/schema";

import {
  Post,
  CreatePost,
  UpdatePost,
} from "../types/posts.type";

// GET ALL || GET
export const getAllPosts = async () => {
  return await db
    .select()
    .from(postsTable);
};

// GET BY ID || GET
export const getPostById = async (id: number) => {
  const post = await db
    .select()
    .from(postsTable)
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