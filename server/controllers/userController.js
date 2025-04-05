import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "User already exists with this email" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered", user: { id: newUser.id, name, email } });
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            message: "Profile loaded",
            user: req.user,  // set by the middleware
        });
    } catch (err) {
        res.status(500).json({ message: "Error loading profile" });
    }
};