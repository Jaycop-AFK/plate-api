"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ownerCar_controller_1 = __importDefault(require("../controllers/ownerCar.controller"));
const router = (0, express_1.Router)();
router.post("/create", ownerCar_controller_1.default.ownerCarCreate);
router.post("/checkAndRecordEntry", ownerCar_controller_1.default.checkAndRecordEntry);
router.get("/", ownerCar_controller_1.default.getOwnerCar);
router.get("/checkCarEntry", ownerCar_controller_1.default.getCarEntry);
exports.default = router;
