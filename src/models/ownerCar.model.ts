import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";


export const OwnerCar = sequelize.define("OwnerCar", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
        
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "phoneNumber",
    },
});