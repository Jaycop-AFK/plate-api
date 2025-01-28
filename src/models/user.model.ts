import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { IUser } from "../interfaces/user.interface";


export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        field: "username",
    },
    hashedPassword: {
        type: DataTypes.STRING,
        field: "hashed_password",
    },
   
});
