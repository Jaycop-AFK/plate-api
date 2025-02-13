import { Request, Response } from "express";
import { IUser, IUserLoginRequest } from "../../interfaces/user.interface";
import UserModel from "../../models/user.model";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLoginUsecase = async (req: Request, res: Response) => {
  try {
    const data: IUserLoginRequest = req.body;
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
    const user: IUser | null = await UserModel.findOne({
      username: data.username,
    })
      .select("+hashedPassword")
      .lean();

    if (!user) {
      return res.status(404).json({
        message: `ไม่พบผู้ใช้งานชื่อ ${data.username}`,
      });
    }

    const passwordIsMatch = await bcrypt.compare(
      data.password,
      user.hashedPassword!
    );

    if (!passwordIsMatch) {
      return res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" });
    }

    const token = await jwt.sign(
      { _id: String(user._id) },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5h",
      }
    );

  return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default userLoginUsecase;