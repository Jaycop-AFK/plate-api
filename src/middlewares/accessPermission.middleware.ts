import { NextFunction, Response } from "express";
import { RequestAndUser } from "../interfaces/user.interface";

const accessPermission = async (
  req: RequestAndUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user!;
    const { _id }: { _id: string } = req.body;

    if (user._id && user._id.toString() !== _id.toString()) {
      return res.status(403).json({ message: "This service is for admins only" });
    }

    next();
  } catch (error) {
    console.error("Access permission error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default { accessPermission };
