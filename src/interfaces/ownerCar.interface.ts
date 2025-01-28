import { NextFunction, Request, Response } from "express";

export interface IOwnerCar {
    id?: number;
    userId: number;
    carId: number;
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

