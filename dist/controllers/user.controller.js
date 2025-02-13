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
const dotenv_1 = __importDefault(require("dotenv"));
const user_create_usecase_1 = require("../usecases/user/user-create.usecase");
const user_login_usecase_1 = require("../usecases/user/user-login.usecase");
const user_self_usecase_1 = __importDefault(require("../usecases/user/user-self.usecase"));
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, user_create_usecase_1.userCreateUsecase)(req, res);
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, user_login_usecase_1.userLoginUsecase)(req, res);
});
const self = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, user_self_usecase_1.default)(req, res);
});
exports.default = { register, login, self };
