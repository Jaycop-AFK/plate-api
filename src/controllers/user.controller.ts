import dotenv from "dotenv";
import {
  IUser,
  RequestAndUser,
  ResponseAndUser,
} from "../interfaces/user.interface";

import { Model } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { User } from "../models/user.model";

const register = async (req: Request, res: Response) => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;
    const exitUser: Model<IUser> | null = await User.findOne({
      where: {
        username,
      },
    });
    if (exitUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
   const hashedPassword = await bcrypt.hash(password, 10);
   const data = {
    username,
    hashedPassword,
   }
   const userCreate: Model<IUser> | null = await User.create({
    ...data
   }) 
   if (!userCreate) {
    return res.status(400).json({ message: "User not created" });
   }
   return res
      .status(201)
      .json({ message: "User created successfully", userCreate });
  
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req: RequestAndUser, res: ResponseAndUser) => {
    try {
      const { username, password } = req.body;
  
      const findUser: Model<IUser> | null = await User.findOne({
        where: {
          username,
        },
      });
      if (!findUser) {
        return res.status(400).json({ message: `Password or Username Wrong.` });
      }
  
      const passwordValid = await bcrypt.compare(
        password,
        findUser.dataValues.hashedPassword!
      );
  
      if (!passwordValid) {
        return res.status(400).json({ message: `Password or Username Wrong.` });
      }
  
      const token = await jwt.sign(
        {
          id: String(findUser.dataValues.id),
        },
        process.env.JWT_SECRET!,
        { expiresIn: "5h" }
      );
  
      return res.status(200).json({ token: token });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error Login" });
    }
  };

  const self = async (req: RequestAndUser, res: ResponseAndUser) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. Please provide a valid token." });
    }
    return res.status(200).json(req.user);
  };
  
  const updateSelf = async (req: RequestAndUser, res: ResponseAndUser) => {
    const user: IUser = req.user!;
    const {
      username,
      email,
      password,
    }: { username?: string; email?: string; password?: string } = req.body;
  
    const updateUser: any = await User.update(
      { username, email, password },
      { where: { id: user.id } }
    );
    if (!updateUser) {
      return res.status(400).json({ message: "User not updated" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  };

  const getUsers = async (req: RequestAndUser, res: ResponseAndUser) => {
    try {
      const user: IUser = req.user!;
      const { perPage = 10, page = 1 } = req.query;
      const offset = (Number(page) - 1) * Number(perPage);
      const findUsers: Model<IUser>[] | null = await User.findAll({
        limit: Number(perPage),
        offset: offset,
      });
      return res.status(200).json({
        page: Number(page),
        perPage: Number(perPage),
        total: findUsers?.length,
        items: findUsers,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error getUsers" });
    }
  };

  const getUserById = async (req: RequestAndUser, res: ResponseAndUser) => {
    try {
      const { id } = req.params;
      const findUserById: Model<IUser>[] | null = await User.findAll({
        where: {
          id,
        },
        attributes: { exclude: ["hashedPassword"] },
      });
      return res.status(200).json(findUserById);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error getUserById" });
    }
  };

  const updateUser = async (req: RequestAndUser, res: ResponseAndUser) => {
    try {
      const {
        username,
        email,
        password,
      }: { username?: string; email?: string; password?: string } = req.body;
  
      const updateUser: any = await User.update(
        { username, email, password },
        { where: { id: req.params.id } }
      );
      if (!updateUser) {
        return res.status(400).json({ message: "User not updated" });
      }
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error updateUser" });
    }
  };

  const deleteUser = async (req: RequestAndUser, res: ResponseAndUser) => {
    try {
      const { id } = req.params;
      const deleteUser: any = await User.destroy({ where: { id } });
      if (!deleteUser) {
        return res.status(400).json({ message: "User not deleted" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error deleteUser" });
    }
  };

  export default {
    register,
    login,
    self,
    updateSelf,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
  }
  
