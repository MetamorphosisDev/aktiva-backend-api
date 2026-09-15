import { Request, Response } from "express";

import {
  getCommentsByPost,
  createComment,
  deleteComment,
} from "../services/comment.service";

// GET
export const getCommentsByPostController = async (
  req: Request,
  res: Response
) => {
  try {
    const postId = Number(req.params.postId);

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post ID tidak valid",
      });
    }

    const comments = await getCommentsByPost(postId);

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil komentar",
      data: comments,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil komentar",
    });
  }
};

// CREATE
export const createCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const postId = Number(req.params.postId);
    const { comment } = req.body;

    if (!postId || !comment) {
      return res.status(400).json({
        success: false,
        message: "Post ID dan comment wajib diisi",
      });
    }

    await createComment(
      userId,
      postId,
      comment
    );

    return res.status(201).json({
      success: true,
      message: "Komentar berhasil ditambahkan",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal menambahkan komentar",
    });
  }
};

// DELETE
export const deleteCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const commentId = Number(req.params.commentId);

    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "Comment ID tidak valid",
      });
    }

    await deleteComment(
      userId,
      commentId
    );

    return res.status(200).json({
      success: true,
      message: "Komentar berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal menghapus komentar",
    });
  }
};