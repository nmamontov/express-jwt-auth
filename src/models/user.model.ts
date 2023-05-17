import mongoose from "mongoose";
import { User } from "../types";
import bcrypt from 'bcrypt';

const saltRounds = 8



// export type OrderDocument = mongoose.Document & User;

// const userSchema = new mongoose.Schema(
//   {
//     firstName: String,
//     lastName: String,
//     idNumber: String,
//     isPassport: Boolean,
//     birthDate: String,
//     phoneNumber: String,
//     city: String,
//   },
//   {
//     timestamps: true,
//   }
// );





export interface I_UserDocument extends mongoose.Document {
  name: string;
  password: string;
 }
 
const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
  name: { type: String, unique: true },
  password: { type: String },
 },
 {
   timestamps: true,
 });

 UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
 });
 

 const UserModel = mongoose.model<I_UserDocument>('User', UserSchema);

 export default UserModel;