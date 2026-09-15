import { db } from "../config/db";
import {
  commentsTable,
  usersTable,
} from "../config/schema";
import { eq, and } from "drizzle-orm";

// GET COMMENT
export const getCommentsByPost = async (postId: number) => {
  return await db
    .select({
      id: commentsTable.id,
      comment: commentsTable.comment,
      createdAt: commentsTable.createdAt,
      userId: usersTable.id,
      userName: usersTable.name,
    })
    .from(commentsTable)
    .leftJoin(
      usersTable,
      eq(commentsTable.userId, usersTable.id)
    )
    .where(eq(commentsTable.postId, postId));
};

// CREATE COMMENT
export const createComment = async (
  userId: number,
  postId: number,
  comment: string
) => {
  return await db.insert(commentsTable).values({
    userId,
    postId,
    comment,
  });
};

// DELETE COMMENT
export const deleteComment = async (
  userId: number,
  commentId: number
) => {
  const result = await db
    .delete(commentsTable)
    .where(
      and(
        eq(commentsTable.id, commentId),
        eq(commentsTable.userId, userId)
      )
    );

  return result;
};