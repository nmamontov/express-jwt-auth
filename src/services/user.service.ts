import UserModel from "../models/user.model";
import UserProfileModel from "../models/user.profile.model";
import { UserProfile } from "../types";
import { User } from "../types";
import { DocumentDefinition } from 'mongoose';
import  { I_UserProfileDocument } from '../models/user.profile.model';
import  { I_UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { REFRESH_SECRET_KEY, SECRET_KEY } from "../middleware/auth";
import { getErrorMessage } from '../utils/errors.util';


export const saveUserProfile = async (profile: DocumentDefinition<I_UserProfileDocument>): Promise<any> => {
  const existingProfile = await UserProfileModel.findOne({user_id: profile.user_id})

  if (!existingProfile){
  try {
    await UserProfileModel.create(profile);
    return "Profile succestully created";  
  } catch (error: any) {
    return getErrorMessage(error);
  }} else {
    await UserProfileModel.findOneAndUpdate({
      user_id: profile.user_id
    },{
      firstName:profile.firstName,
      lastName:profile.lastName,
      phoneNumber:profile.phoneNumber
    })
    return "Profile updated";
  }
};

export const getUserProfile = async (user_id: String): Promise<any> => {
  try {
    const user_profile: any = await UserProfileModel.findOne({user_id:user_id});
    return user_profile;
  } catch(error) {
    return getErrorMessage(error);
  }
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
      throw new Error('Name of user is not correct');
    }
 
    const isMatch = bcrypt.compareSync(user.password, foundUser.password);
 
    if (isMatch) {
      const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, SECRET_KEY, {
        expiresIn: '15 minutes',
      });

      const refresh_token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, REFRESH_SECRET_KEY, {
        expiresIn: '2 hours',
      })
      
      return { user: { _id: foundUser._id?.toString(), name: foundUser.name }, token: token, refresh_token: refresh_token };
    } else {
      throw new Error('Password is not correct');
    }
  } catch (error) {
    throw error;
  }
}