import { Router } from "express";
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/activity.controller";

const router = Router();

router.get("/", getActivities);
router.get("/:id", getActivityById);
router.post("/", createActivity);
router.patch("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;