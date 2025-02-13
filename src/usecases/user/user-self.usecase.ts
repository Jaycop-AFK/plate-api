import { Request, Response } from 'express';
import { RequestAndUser, ResponseAndUser } from '../../interfaces/user.interface';

export const selfUsecase = async (req: RequestAndUser, res: ResponseAndUser) => {
    try {
      return res.status(200).json(req.user);
    } catch (error) {
      return res.status(500).json({ message: "เกิดข้อผิดพลาดจากระบบ" });
    }
  };
export default selfUsecase;