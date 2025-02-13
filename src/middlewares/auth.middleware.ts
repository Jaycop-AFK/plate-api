import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { IUser, NextFunctionAndUser, RequestAndUser, ResponseAndUser } from "../interfaces/user.interface";
import dotenv from "dotenv";
import UserModel from "../models/user.model";

dotenv.config();

const authenticateToken = async (
  req: RequestAndUser,
  res: ResponseAndUser,
  next: NextFunctionAndUser
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "ไม่พบ Token" });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      async (
        err: jwt.VerifyErrors | null,
        decode: { _id: string } | any
      ): Promise<NextFunctionAndUser | ResponseAndUser | any> => {
        if (err) {
          return res.status(403).json({ message: "คีย์หมดอายุ" });
        }
        let user: IUser | null = await UserModel.findById(decode._id);
        if (!user || user.deletedAt) {
          return res.status(403).json({ message: "ไม่พบผู้ใช้งาน" });
        }
        req.user = user;
        next();
      }
    );
  } catch (err) {
    return res.status(400).json({ message: "เกิดข้อผิดพลาดจากระบบ" });
  }
};


export default { authenticateToken };
