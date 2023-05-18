import UserProfileModel from "../models/user.profile.model";
import { DocumentDefinition } from 'mongoose';
import  { I_UserProfileDocument } from '../models/user.profile.model';
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
