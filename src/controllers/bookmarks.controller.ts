import { Request, Response } from "express";

import {
  getUserBookmarks,
  getBookmarkByPost,
  createBookmark,
  deleteBookmark,
} from "../services/bookmarks.service";

// GET ALL USER BOOKMARKS
export const getBookmarks = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const bookmarks = await getUserBookmarks(userId);

    res.status(200).json({
      success: true,
      data: bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil bookmark",
    });
  }
};

// GET BOOKMARK BY POST
export const getBookmark = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const postId = Number(req.params.postId);

    const bookmark = await getBookmarkByPost(
      userId,
      postId
    );

    res.status(200).json({
      success: true,
      data: bookmark[0] ?? null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil bookmark",
    });
  }
};

// CREATE BOOKMARK
export const createBookmarkController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const postId = Number(req.params.postId);

    await createBookmark(userId, postId);

    res.status(201).json({
      success: true,
      message: "Post berhasil ditambahkan ke bookmark",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan bookmark",
    });
  }
};

// DELETE BOOKMARK
export const deleteBookmarkController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const postId = Number(req.params.postId);

    await deleteBookmark(userId, postId);

    res.status(200).json({
      success: true,
      message: "Bookmark berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menghapus bookmark",
    });
  }
};