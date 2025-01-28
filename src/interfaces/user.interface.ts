import { NextFunction, Request, Response } from "express";

export interface IUser {
  id: number;
  username: string;

  hashedPassword?: string;
  
  createdAt: Date;
  updatedAt: Date;
}


export interface RequestAndUser extends Request {
  user?: IUser;
}

export interface ResponseAndUser extends Response {
  user?: IUser;
}

export interface NextFunctionAndUser extends NextFunction {
  user?: IUser;
}
