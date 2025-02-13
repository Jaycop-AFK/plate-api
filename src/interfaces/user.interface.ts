import { NextFunction, Request, Response } from "express";
import { Types } from 'mongoose';

export interface IUserCreateRequest {
  username: string;
  password: string;
}

export interface IUserLoginRequest {
  username: string;
  password: string;
}

export interface IUser {
  _id: Types.ObjectId | undefined;
  username: string;

  hashedPassword?: string;
  
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
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
