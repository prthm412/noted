import express from "express";
import { createSubject, getSubjects } from "../controllers/subjectController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/subjects
router.post("/", protect, createSubject);

// GET route
router.get("/", protect, getSubjects);

export default router;