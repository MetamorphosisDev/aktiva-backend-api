import { Router } from "express";

import {
  getCategories,
  getCategory,
  createCategoryController,
  deleteCategoryController,
  updateCategoryController
} from "../controllers/categories.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

// GET ALL
router.get("/", getCategories);

// GET BY ID
router.get("/:id", getCategory);

// CREATE
router.post("/", createCategoryController);

// UPDATE
router.patch("/:id", updateCategoryController);

// DELETE
router.delete("/:id", deleteCategoryController);

export default router;