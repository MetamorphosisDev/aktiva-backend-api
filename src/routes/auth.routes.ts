import { Router } from "express";

import {
  register,
  login,
  profile,
  updateProfileController,
  deleteProfileController,
} from "../controllers/auth.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// PROFILE
router.get("/profile", authMiddleware, profile);
router.patch("/profile", authMiddleware, updateProfileController);
router.delete("/profile", authMiddleware, deleteProfileController);

export default router;