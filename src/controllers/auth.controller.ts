import { Request, Response } from "express";
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';
import jwt from 'jsonwebtoken';
import { SECRET_KEY, REFRESH_SECRET_KEY } from "../middleware/auth";
import { I_UserDocument } from "../models/user.model";
import UserModel from "../models/user.model";

interface Map {
  [key: string]: string | undefined
}
const token_list: Map = {
  init: "value",
}

const tList = (str: string) => token_list[str] || str

export const loginOne = async (req: Request, res: Response) => {
  
  try {
    const foundUser = await userServices.login(req.body);
    //Adding refresh token to list
    token_list[foundUser.user._id] = foundUser.refresh_token;
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
    const postData = req.body;
    if ((postData.refresh_token) && (postData.refresh_token == token_list[postData['_id']])){
      const decoded = jwt.verify(postData.refresh_token, REFRESH_SECRET_KEY);
      const foundUser: I_UserDocument | null = await UserModel.findById({ _id: postData['_id'] });
      if (foundUser){
      
      const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, SECRET_KEY, {
        expiresIn: '15 minutes',
      });
      const refresh_token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, REFRESH_SECRET_KEY, {
        expiresIn: '2 hours',
      });

      token_list[foundUser._id] = refresh_token;
      
      res.status(200).send({token,refresh_token});
      }else{
        throw new Error('User not found');
      }
      
    } else {
      throw new Error('Invalid refresh token')
    }
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}