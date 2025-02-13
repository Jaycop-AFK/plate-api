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
exports.ownerCarCreateUsecase = void 0;
const ownerCar_model_1 = __importDefault(require("../../models/ownerCar.model"));
const ownerCarCreateUsecase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newOwnerCar = new ownerCar_model_1.default({
            license_plate: data.license_plate,
            name: data.name,
            phoneNumber: data.phoneNumber
        });
        yield newOwnerCar.save();
        return res.status(201).json({ message: "Owner car created successfully", newOwnerCar });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
});
exports.ownerCarCreateUsecase = ownerCarCreateUsecase;
exports.default = exports.ownerCarCreateUsecase;
