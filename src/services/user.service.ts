import UserModel from "../models/user.model";

import  { I_UserDocument } from '../models/user.model';

export async function user_area(token: any): Promise<any> {
  const foundUser: I_UserDocument | null = await UserModel.findById({ _id: token._id });
  const msg: String = 'Hello, ' + foundUser?.name;
  return msg;
}