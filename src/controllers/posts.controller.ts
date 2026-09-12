import { Request, Response } from "express";

import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  deleteAllPosts,
} from "../services/posts.service";

import {
  createPostSchema,
  updatePostSchema,
} from "../validations/post.validation";

import { uploadToCloudinary } from "../services/upload.service";

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
    console.log("1. Request masuk");

    let coverImage: string | undefined;

    if (req.file) {
      console.log("2. Mulai upload Cloudinary");

      const uploadResult = await uploadToCloudinary(
        req.file.buffer
      );

      coverImage = uploadResult.secure_url;

      console.log("3. Upload Cloudinary selesai");
      console.log("Cloudinary URL:", coverImage);
      console.log("Cloudinary Public ID:", uploadResult.public_id);
    }

    const data = createPostSchema.parse({
      ...req.body,
      userId: req.user!.id,
      coverImage,
    });

    console.log("4. Schema selesai");

    await createPost(data);

    console.log("5. Database selesai");

    return res.status(201).json({
      success: true,
      message: "Post berhasil dibuat",
    });
  } catch (error: any) {
    console.error("=== CREATE POST ERROR ===");
    console.dir(error, { depth: null });

    return res.status(500).json({
      success: false,
      message: error?.message || "Upload gagal",
      error: error?.error || error,
    });
  }
};

// PATCH
// PATCH
export const updatePostController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user!.id;

    let coverImage: string | undefined;

    if (req.file) {
      console.log("Mulai upload Cloudinary untuk update");

      const uploadResult = await uploadToCloudinary(
        req.file.buffer
      );

      coverImage = uploadResult.secure_url;

      console.log("Upload Cloudinary selesai");
      console.log("Cloudinary URL:", coverImage);
    }

    const data = updatePostSchema.parse({
      ...req.body,
      ...(coverImage && { coverImage }),
    });

    const result = await updatePost(
      id,
      userId,
      data
    );

    if (result[0].affectedRows === 0) {
      return res.status(403).json({
        success: false,
        message: "Kamu tidak memiliki akses untuk mengubah post ini",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post berhasil diubah",
    });
  } catch (error: any) {
    console.error("=== UPDATE POST ERROR ===");
    console.dir(error, { depth: null });

    return res.status(400).json({
      success: false,
      message: error?.message || "Gagal mengubah post",
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
    const userId = req.user!.id;

    const result = await deletePost(id, userId);

    if (result[0].affectedRows === 0) {
      return res.status(403).json({
        success: false,
        message: "Kamu tidak memiliki akses untuk menghapus post ini",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal menghapus post",
    });
  }
};

// DELETE ALL POST
export const deleteAllPostsController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteAllPosts();

    return res.status(200).json({
      success: true,
      message: "Semua post berhasil dihapus",
    });
  } catch (error: any) {
    console.error("DELETE ALL ERROR:", error);
    console.error("CODE:", error?.code);
    console.error("SQL MESSAGE:", error?.sqlMessage);

    return res.status(500).json({
      success: false,
      message: "Gagal menghapus semua post",
    });
  }
};