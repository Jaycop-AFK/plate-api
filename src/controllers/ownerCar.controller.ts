import  dotenv  from 'dotenv';
import { Request, Response } from "express";
import ownerCarCreateUsecase from '../usecases/ownerCar/ownerCar-create.usecase';
import checkAndRecordEntryUsecase from '../usecases/ownerCar/ownerCar-check.usecase';
import ownerCarCheckUsecase from '../usecases/ownerCar/ownerCar-check.usecase';

dotenv.config();

const ownerCarCreate = async (req: Request, res: Response) => {
    return ownerCarCreateUsecase(req, res);
}

const checkAndRecordEntry = async (req: Request, res: Response) => {
    return checkAndRecordEntryUsecase(req, res);
}


const getOwnerCar = async (req: Request, res: Response) => {
    return ownerCarCheckUsecase(req, res);
}

const getCarEntry = async (req: Request, res: Response) => {
    return checkAndRecordEntryUsecase(req, res);
}



export default { ownerCarCreate, checkAndRecordEntry, getOwnerCar, getCarEntry };

