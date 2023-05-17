import { Request, Response } from "express";
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';




export const loginOne = async (req: Request, res: Response) => {
  console.log("loginOne")
  try {
    const foundUser = await userServices.login(req.body);
    //console.log('found user', foundUser.token);
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