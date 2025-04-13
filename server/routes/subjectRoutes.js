import express from "express";
import { createSubject } from "../controllers/subjectController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/subjects
router.post("/", protect, createSubject);

export default router;