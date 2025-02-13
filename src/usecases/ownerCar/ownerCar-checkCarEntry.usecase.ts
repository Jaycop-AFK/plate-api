import CarEntryModel from "../../models/carEntry.model";
import { Request, Response } from "express";

export const getCheckCarEntry = async (req: Request, res: Response) => {
    try {
        const carEntries = await CarEntryModel.find({});
        return res.status(200).json({ message: "Car entries fetched successfully", carEntries });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
        
    }
}