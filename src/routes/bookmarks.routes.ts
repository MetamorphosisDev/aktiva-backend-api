import { Router } from "express";

import {
  getBookmarks,
  getBookmark,
  createBookmarkController,
  deleteBookmarkController,
} from "../controllers/bookmarks.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

// GET ALL USER BOOKMARKS
router.get("/", getBookmarks);

// GET BOOKMARK BY POST
router.get("/:postId", getBookmark);

// CREATE BOOKMARK
router.post("/:postId", createBookmarkController);

// DELETE BOOKMARK
router.delete("/:postId", deleteBookmarkController);

export default router;