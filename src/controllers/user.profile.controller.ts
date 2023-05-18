import { Request, Response } from "express";
import { I_UserProfileDocument } from "../models/user.profile.model";
import { saveUserProfile } from "../services/user.profile.service";
import { getUserProfile } from "../services/user.profile.service";
import { getErrorMessage } from '../utils/errors.util';


export const postProfile = async (req: Request, res: Response) => {
  const profile_data: I_UserProfileDocument = req.body.profile;
  profile_data.user_id = req.body.token._id;
  try {
    const result = await saveUserProfile(profile_data);
    console.log(result)
    res.status(200).send(result)
  } catch (error: any) {
    res.status(500).send(getErrorMessage(error));
  }
  
}

export const getProfile = async (req: Request, res: Response) => {
  const user_id: String = req.body.token._id;
  try {
    const profile = await getUserProfile(user_id);
    res.status(200).send(profile);
  } catch(error){
    res.status(500).send(getErrorMessage(error));
  }
}