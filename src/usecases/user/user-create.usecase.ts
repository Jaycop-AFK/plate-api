import { Request, Response } from "express";
import { IUser, IUserCreateRequest } from "../../interfaces/user.interface";
import UserModel from "../../models/user.model";
import * as bcrypt from 'bcrypt';


export const userCreateUsecase = async (req: Request, res: Response) => {
    try {
        const data: IUserCreateRequest = req.body;
        if(data.username.length < 3){
         return res.status(400).json({ message: "Username must be at least 3 characters" });   
        }

        if(data.password.length < 3){
            return res.status(400).json({ message: "Password must be at least 3 characters" });   
           }

        const userExist: IUser | null = await UserModel.findOne({
            where: {
                username: data.username,
            },
        });
        if(userExist){
            return res.status(400).json({ message: "Username already exists" });   
           }

           const hashedPassword = await bcrypt.hash(data.password, 10);

           const newUser = new UserModel({
            username: data.username,
            hashedPassword: hashedPassword
           });

           await newUser.save();

           return res.status(201).json({ message: "User created successfully", newUser });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });   
    }
} 