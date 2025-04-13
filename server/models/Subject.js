import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Subject = sequelize.define("Subject", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Subject;