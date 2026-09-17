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


export default router;