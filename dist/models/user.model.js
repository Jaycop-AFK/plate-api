"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.User = database_1.sequelize.define("User", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        field: "username",
    },
    hashedPassword: {
        type: sequelize_1.DataTypes.STRING,
        field: "hashed_password",
    },
});
