import express from "express";
import CarEntryModel from "../../models/carEntry.model";

export const checkAndRecordEntryUsecase = async (req: express.Request, res: express.Response) => {
   
    try {
        const carEntries = await CarEntryModel.find({});    
        return res.status(200).json({ message: "Car entries fetched successfully", carEntries });
         
    
    } catch (error) {
        return res.status(500).json({ message: "An error occurred.",  });
    }
};

export default checkAndRecordEntryUsecase;
    