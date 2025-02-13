import  dotenv  from 'dotenv';
import { userCreateUsecase } from '../usecases/user/user-create.usecase';
import { Request, Response } from "express";
import { userLoginUsecase } from '../usecases/user/user-login.usecase';
import selfUsecase from '../usecases/user/user-self.usecase';

dotenv.config();

const register = async (req: Request, res: Response) => {
  return userCreateUsecase(req, res);
};

const login = async (req: Request, res: Response) => {
  return userLoginUsecase(req, res);
};

const self = async (req: Request, res: Response) => {
  return selfUsecase(req, res);
};

export default { register, login, self };