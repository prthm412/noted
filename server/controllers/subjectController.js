import Subject from "../models/Subject.js";

export const createSubject = async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Subject name is required" });
    }

    try {
        const subject = await Subject.create({
            name,
            description,
            userId: req.user.id,  // from JWT middleware
        });

        res.status(201).json({ message: "Subject created", subject });
    } catch (err) {
        res.status(500).json({ message: "Failed to create subject", error: err.message });
    }
};

export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.findAll({
            where: { userId: req.user.id },
        });

        res.status(200).json(subjects);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch subjects", error: err.message });
    }
};