import mongoose from "mongoose";

export interface I_UserProfileDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  user_id: mongoose.Schema.Types.ObjectId;
 }
 
const UserProfileSchema: mongoose.Schema<I_UserProfileDocument> = new mongoose.Schema({
  firstName: { type: String, unique: true },
  lastName: { type: String },
  phoneNumber: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId}
 },
 {
   timestamps: true,
 });

 const UserProfileModel = mongoose.model<I_UserProfileDocument>('UserProfile', UserProfileSchema);

 export default UserProfileModel;