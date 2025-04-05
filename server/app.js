import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import User from "./models/User.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Health check route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try{
        await sequelize.authenticate();
        console.log("Connected to PostgreSQL DB");

        await sequelize.sync();
        console.log(" - Models synchronized with the database");
    } catch (error) {
        console.error("Unable to connect to DB: ", error);
    }

    console.log(`Server is running on port ${PORT}`);
});