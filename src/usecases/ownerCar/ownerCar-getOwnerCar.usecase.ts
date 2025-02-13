import OwnerCarModel from "../../models/ownerCar.model";
import { Request, Response } from "express";

export const getOwnerCarUsecase = async (req: Request, res: Response) => {
    try {
        const ownerCars = await OwnerCarModel.find({});
        return res.status(200).json({ message: "Owner cars fetched successfully", ownerCars });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
}

export default getOwnerCarUsecase;