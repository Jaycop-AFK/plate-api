"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// สร้าง Schema สำหรับบันทึกการเข้ามาของรถ
const carEntrySchema = new mongoose_1.default.Schema({
    license_plate: { type: String, required: true },
    name: { type: String, required: true },
    entry_time: { type: Date, default: Date.now }
});
const CarEntryModel = mongoose_1.default.model("CarEntry", carEntrySchema);
exports.default = CarEntryModel;
