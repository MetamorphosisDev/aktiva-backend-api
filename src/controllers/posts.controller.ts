import { Request, Response } from "express";

import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../services/posts.service";
import { createPostSchema, updatePostSchema } from "../validations/post.validation";

// GET ALL
export const getPosts = async (
  _req: Request,
  res: Response
) => {
  try {
    const posts = await getAllPosts();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data posts",
    });
  }
};

// GET BY ID
export const getPost = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil post",
    });
  }
};

// POST
export const createPostController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = createPostSchema.parse(req.body);

    await createPost(data);

    res.status(201).json({
      success: true,
      message: "Post berhasil dibuat",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Data post tidak valid",
    });
  }
};

// PATCH
export const updatePostController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const data = updatePostSchema.parse(req.body);

    await updatePost(id, data);

    res.status(200).json({
      success: true,
      message: "Post berhasil diubah",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Gagal mengubah post",
    });
  }
};

// DELETE BY ID
export const deletePostController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await deletePost(id);

    res.status(200).json({
      success: true,
      message: "Post berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus post",
    });
  }
};