import express from "express";
import { createTask } from "../controllers/taskController.js";
import { getTasks } from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/tasks
router.post("/", protect, createTask);

// GET /api/tasks?subjectId=1
router.get("/", protect, getTasks);

export default router;