import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    const { title, status, dueDate, subjectId } = req.body;

    if (!title || !subjectId) {
        return res.status(400).json({ message: "Title and subjectId are required" });
    }

    try {
        const task = await Task.create({
            title,
            status,
            dueDate,
            subjectId,
            userId: req.user.id,    // comes from token
        });

        res.status(201).json({ message: "Task created", task });
    } catch (err) {
        res.status(500).json({ message: "Failed to create task", error: err.message });
    }
};

export const getTasks = async (req, res) => {
    const { subjectId } = req.query;

    try {
        const query = {
            where: { userId: req.user.id },
        };

        if (subjectId) {
            query.where.subjectId = subjectId;
        }

        const tasks = await Task.findAll(query);
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
    }
};