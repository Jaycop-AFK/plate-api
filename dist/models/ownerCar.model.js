"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerCar = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.OwnerCar = database_1.sequelize.define("OwnerCar", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "name",
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "phoneNumber",
    },
});
