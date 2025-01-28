import { Application, Router } from "express";
import userController from "../controllers/user.controller";
import accessPermissionMiddleware from "../middlewares/accessPermission.middleware";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", userController.register as Application);
router.post("/login", userController.login as Application);
router.get(
  "/self",
  authMiddleware.authenticateToken as Application,
  userController.self as Application
);
router.get(
  "/",
  authMiddleware.authenticateToken as Application,
  userController.getUsers as Application
);
router.get(
  "/:id",
  authMiddleware.authenticateToken as Application,
  userController.getUserById as Application
);
router.put(
  "/:id",
  authMiddleware.authenticateToken as Application,
  userController.updateUser as Application
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken as Application,
  userController.deleteUser as Application
);

export default router;
