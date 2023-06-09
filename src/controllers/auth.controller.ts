import { Request, Response } from "express";
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';

export const loginOne = async (req: Request, res: Response) => {
  
  try {
    const foundUser = await userServices.login(req.body);
    res.status(200).send(foundUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
 };

export const registerOne = async (req: Request, res: Response) => {
 try {
   await userServices.register(req.body);
   res.status(200).send('User created succesfully');
 } catch (error) {
   return res.status(500).send(getErrorMessage(error));
 }
};

export const newToken = async (req: Request, res: Response) => {
  try{
    const refresh_token = req.body.refresh_token;
    const tokens: any = await userServices.renew_token(refresh_token);
    res.status(200).send(tokens);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}




