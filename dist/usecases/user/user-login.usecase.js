"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.userLoginUsecase = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userLoginUsecase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data.username.length < 3) {
            return res
                .status(400)
                .json({ message: "Username must be at least 3 characters" });
        }
        if (data.password.length < 3) {
            return res
                .status(400)
                .json({ message: "Password must be at least 3 characters" });
        }
        const user = yield user_model_1.default.findOne({
            username: data.username,
        })
            .select("+hashedPassword")
            .lean();
        if (!user) {
            return res.status(404).json({
                message: `ไม่พบผู้ใช้งานชื่อ ${data.username}`,
            });
        }
        const passwordIsMatch = yield bcrypt.compare(data.password, user.hashedPassword);
        if (!passwordIsMatch) {
            return res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" });
        }
        const token = yield jsonwebtoken_1.default.sign({ _id: String(user._id) }, process.env.JWT_SECRET, {
            expiresIn: "5h",
        });
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.userLoginUsecase = userLoginUsecase;
exports.default = exports.userLoginUsecase;
