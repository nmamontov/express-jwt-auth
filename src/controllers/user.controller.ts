import { Request, Response } from "express";
import UserModel, { I_UserDocument } from "../models/user.model";

export const userarea = async (req: Request, res: Response) => {
  const token: any = req.body['token']
  
  const foundUser: I_UserDocument | null = await UserModel.findById({ _id: token['_id'] });
  const msg: String = foundUser?.name + " area";
  try {
    res.status(200).send(msg);
  } catch (error: any) {
    res.status(500).send();
  }
};