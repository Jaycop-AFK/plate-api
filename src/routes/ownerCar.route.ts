import { Application, Router } from "express";
import ownerCar from "../controllers/ownerCar.controller";

const router = Router();

router.post("/create", ownerCar.ownerCarCreate as Application);
router.post("/checkAndRecordEntry", ownerCar.checkAndRecordEntry as Application);
router.get("/", ownerCar.getOwnerCar as Application);
router.get("/checkCarEntry", ownerCar.getCarEntry as Application);

export default router;