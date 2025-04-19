import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Note = sequelize.define("Note", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Note;