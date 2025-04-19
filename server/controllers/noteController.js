import Note from "../models/Note.js";

export const createNote = async (req, res) => {
    const { title, content, subjectId } = req.body;

    if (!title || !content || !subjectId) {
        return res.status(400).json({ message: "Title, content, and subjectId are required" });
    }

    try {
        const note = await Note.create({
            title,
            content,
            subjectId,
            userId: req.user.id,
        });

        res.status(201).json({ message: "Note created", note });
    } catch (err) {
        res.status(500).json({ message: "Failed to create note", error: err.message });
    }
};

export const getNotes = async (req, res) => {
    const { subjectId } = req.query;

    try {
        const query = {
            where: { userId: req.user.id },
        };

        if (subjectId) {
            query.where.subjectId = subjectId;
        }

        const notes = await Note.findAll(query);
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch notes", error: err.message });
    }
};