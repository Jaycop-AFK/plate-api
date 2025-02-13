import { NextFunction, Request, Response } from "express";
import { Types } from 'mongoose';

export interface IOwnerCarCreateRequest {
    userId: number;
    license_plate: string;
    name: string;   
    phoneNumber: string;
}

export interface IOwnerCar {
    id?: Types.ObjectId | undefined;
    userId: number;
    license_plate: string;
    name: string;
    phoneNumber: string;
}

export interface IOwnerCarRequest extends Request {
    ownerCar?: IOwnerCar;
}

export interface IOwnerCarResponse extends Response {
    ownerCar?: IOwnerCar;
}

export interface IOwnerCarNextFunction extends NextFunction {
    ownerCar?: IOwnerCar;
}

