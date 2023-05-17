import UserModel from "../models/user.model";
import { User } from "../types";
import { DocumentDefinition } from 'mongoose';
import  { I_UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../middleware/auth";

export const save = async (order: User): Promise<any> => {
  const newOrder = (await UserModel.create(order)).save();
  if (!newOrder) throw new Error("Not created");
  return newOrder;
};



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
      throw new Error('Name of user is not correct');
    }
 
    const isMatch = bcrypt.compareSync(user.password, foundUser.password);
 
    if (isMatch) {
      const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, SECRET_KEY, {
        expiresIn: '2 days',
      });
 
      return { user: { _id: foundUser._id?.toString(), name: foundUser.name }, token: token };
    } else {
      throw new Error('Password is not correct');
    }
  } catch (error) {
    throw error;
  }
 }