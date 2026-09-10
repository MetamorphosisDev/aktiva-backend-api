import { Router } from "express";

import {
  getPosts,
  getPost,
  createPostController,
  updatePostController,
  deletePostController,
} from "../controllers/posts.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// GET
router.get("/", authMiddleware, getPosts);

router.get("/:id", authMiddleware, getPost);

// POST
router.post("/", authMiddleware, createPostController);

// PATCH
router.patch("/:id", authMiddleware, updatePostController);

// DELETE
router.delete("/:id", authMiddleware, deletePostController);

export default router;