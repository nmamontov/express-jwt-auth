import { Request, Response } from "express";
import { getErrorMessage } from '../utils/errors.util';
import { CustomRequest } from '../middleware/auth';

export const userarea = async (req: Request, res: Response) => {
  const msg: String = "user area";
  try {
    res.status(200).send(msg);
  } catch (error: any) {
    res.status(500).send();
  }
};