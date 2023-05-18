import UserModel from "../models/user.model";
import { DocumentDefinition } from 'mongoose';
import  { I_UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { REFRESH_SECRET_KEY, SECRET_KEY } from "../middleware/auth";

interface Map {
  [key: string]: string | undefined
}
const token_list: Map = {
  init: "value",
}

export async function register(user: DocumentDefinition<I_UserDocument>): Promise<void> {
 try {
   await UserModel.create(user);
 } catch (error) {
   throw error;
 }
}

export async function login(user: DocumentDefinition<I_UserDocument>) {
  try {
    const foundUser = await UserModel.findOne({ name: user.name });
 
    if (!foundUser) {
      throw new Error('Incorrect username or password');
    }
 
    const isMatch = bcrypt.compareSync(user.password, foundUser.password);
 
    if (isMatch) {
      const tokens: any = await generate_tokens(foundUser._id, foundUser.name, SECRET_KEY, REFRESH_SECRET_KEY)
      token_list[foundUser._id] = tokens.refresh_token;
      
      return { user: { _id: foundUser._id?.toString(), name: foundUser.name }, token: tokens.token, refresh_token: tokens.refresh_token };
    } else {
      throw new Error('Incorrect username or password');
    }
  } catch (error) {
    throw error;
  }
}

export async function renew_token(refresh_token: any) {
    // console.log(token_list)
    // console.log(refresh_token)
    const decoded: any = jwt.verify(refresh_token, REFRESH_SECRET_KEY);
    
    if (refresh_token == token_list[decoded._id]){
      const foundUser: I_UserDocument | null = await UserModel.findById({ _id: decoded._id });
      if (foundUser){
        const tokens: any = await generate_tokens(foundUser._id,foundUser.name,SECRET_KEY,REFRESH_SECRET_KEY);
        token_list[foundUser._id] = tokens.refresh_token;
        return {token:tokens.token, refresh_token:tokens.refresh_token}
      }else{
        throw new Error('User not found');
      }
    } else {
      throw new Error('Invalid refresh token')
    }
}

const generate_tokens = async (user_id: String, user_name: String, secret: any, refresh_secret: any): Promise<any> =>{
  const token = jwt.sign({ _id: user_id, name: user_name }, secret, {
    expiresIn: '15 minutes',
  });
  const refresh_token = jwt.sign({ _id: user_id, name: user_name }, refresh_secret, {
    expiresIn: '2 hours',
  });
  return {
    token:token,
    refresh_token: refresh_token
  };
}