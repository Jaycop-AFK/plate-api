"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ownerCarSchema = new mongoose_1.default.Schema({
    license_plate: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});
const OwnerCarModel = mongoose_1.default.model("OwnerCar", ownerCarSchema);
exports.default = OwnerCarModel;
