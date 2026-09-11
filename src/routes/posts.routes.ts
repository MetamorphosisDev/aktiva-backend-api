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

// GET ALL
router.get("/", authMiddleware, getPosts);

// GET BY ID
router.get("/:id", authMiddleware, getPost);

// CREATE
router.post("/", authMiddleware, createPostController);

// UPDATE
router.patch("/:id", authMiddleware, updatePostController);

// DELETE
router.delete("/:id", authMiddleware, deletePostController);

export default router;