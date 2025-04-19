import express from "express";
import { createNote, getNotes } from "../controllers/noteController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a new note
router.post("/", protect, createNote);

// Get notes (optionally by subject)
router.get("/", protect, getNotes);

export default router;