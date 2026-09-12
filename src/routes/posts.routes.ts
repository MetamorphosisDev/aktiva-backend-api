import { Router } from "express";

import {
  getPosts,
  getPost,
  createPostController,
  updatePostController,
  deletePostController,
  deleteAllPostsController
} from "../controllers/posts.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import { uploadSingleImage } from "../middleware/upload.middleware";

const router = Router();

router.use(authMiddleware);

// GET ALL
router.get("/", getPosts);

// GET BY ID
router.get("/:id", getPost);

// CREATE
router.post(
  "/",
  uploadSingleImage,
  createPostController
);

// UPDATE
router.patch(
  "/:id",
  uploadSingleImage,
  updatePostController
);

// DELETE ALL
router.delete(
  `/${process.env.DELETE_ALL_SECRET}`,
  deleteAllPostsController
);

// DELETE BY ID
router.delete("/:id", deletePostController);

export default router;