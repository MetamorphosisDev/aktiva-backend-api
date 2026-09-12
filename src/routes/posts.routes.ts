import { Router } from "express";
import upload from "../middleware/upload.middleware";

import {
  getPosts,
  getPost,
  createPostController,
  updatePostController,
  deletePostController,
  deleteAllPostsController
} from "../controllers/posts.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

// GET ALL
router.get("/", getPosts);

// GET BY ID
router.get("/:id", getPost);

// CREATE
router.post("/", upload.single("coverImage"), createPostController);

// UPDATE
router.patch("/:id", upload.single("coverImage"), updatePostController);

// DELETE ALL
router.delete(
  `/${process.env.DELETE_ALL_SECRET}`,
  deleteAllPostsController
);

// DELETE BY ID
router.delete("/:id", deletePostController);

export default router;