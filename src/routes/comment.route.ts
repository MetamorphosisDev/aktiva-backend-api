import { Router } from "express";

import {
  getCommentsByPostController,
  createCommentController,
  deleteCommentController,
} from "../controllers/comment.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// GET COMMENT
router.get(
  "/post/:postId",
  getCommentsByPostController
);

// CREATE COMMENT
router.post(
  "/post/:postId",
  authMiddleware,
  createCommentController
);

// DELETE COMMENT
router.delete(
  "/:commentId",
  authMiddleware,
  deleteCommentController
);

export default router;