"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const exitUser = yield user_model_1.User.findOne({
            where: {
                username,
            },
        });
        if (exitUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const data = {
            username,
            hashedPassword,
        };
        const userCreate = yield user_model_1.User.create(Object.assign({}, data));
        if (!userCreate) {
            return res.status(400).json({ message: "User not created" });
        }
        return res
            .status(201)
            .json({ message: "User created successfully", userCreate });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const findUser = yield user_model_1.User.findOne({
            where: {
                username,
            },
        });
        if (!findUser) {
            return res.status(400).json({ message: `Password or Username Wrong.` });
        }
        const passwordValid = yield bcrypt_1.default.compare(password, findUser.dataValues.hashedPassword);
        if (!passwordValid) {
            return res.status(400).json({ message: `Password or Username Wrong.` });
        }
        const token = yield jsonwebtoken_1.default.sign({
            id: String(findUser.dataValues.id),
        }, process.env.JWT_SECRET, { expiresIn: "5h" });
        return res.status(200).json({ token: token });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error Login" });
    }
});
const self = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res
            .status(401)
            .json({ message: "Unauthorized access. Please provide a valid token." });
    }
    return res.status(200).json(req.user);
});
const updateSelf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { username, email, password, } = req.body;
    const updateUser = yield user_model_1.User.update({ username, email, password }, { where: { id: user.id } });
    if (!updateUser) {
        return res.status(400).json({ message: "User not updated" });
    }
    return res.status(200).json({ message: "User updated successfully" });
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { perPage = 10, page = 1 } = req.query;
        const offset = (Number(page) - 1) * Number(perPage);
        const findUsers = yield user_model_1.User.findAll({
            limit: Number(perPage),
            offset: offset,
        });
        return res.status(200).json({
            page: Number(page),
            perPage: Number(perPage),
            total: findUsers === null || findUsers === void 0 ? void 0 : findUsers.length,
            items: findUsers,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error getUsers" });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findUserById = yield user_model_1.User.findAll({
            where: {
                id,
            },
            attributes: { exclude: ["hashedPassword"] },
        });
        return res.status(200).json(findUserById);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error getUserById" });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, } = req.body;
        const updateUser = yield user_model_1.User.update({ username, email, password }, { where: { id: req.params.id } });
        if (!updateUser) {
            return res.status(400).json({ message: "User not updated" });
        }
        return res.status(200).json({ message: "User updated successfully" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error updateUser" });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteUser = yield user_model_1.User.destroy({ where: { id } });
        if (!deleteUser) {
            return res.status(400).json({ message: "User not deleted" });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error deleteUser" });
    }
});
exports.default = {
    register,
    login,
    self,
    updateSelf,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
