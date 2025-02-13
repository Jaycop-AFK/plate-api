import { Request, Response } from "express";
import { IOwnerCar, IOwnerCarCreateRequest } from "../../interfaces/ownerCar.interface";
import OwnerCarModel from "../../models/ownerCar.model";

export const ownerCarCreateUsecase = async (req: Request, res: Response) => {
    try {
        const data: IOwnerCarCreateRequest = req.body;
        const newOwnerCar = new OwnerCarModel({
            
            license_plate: data.license_plate,
            name: data.name,
            phoneNumber: data.phoneNumber
        });
        await newOwnerCar.save();
        return res.status(201).json({ message: "Owner car created successfully", newOwnerCar });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
}

export default ownerCarCreateUsecase;