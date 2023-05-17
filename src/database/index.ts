import mongoose from "mongoose";
import { config } from "dotenv";
import * as path from "path";

mongoose.set("strictQuery", false);

config({ path: path.resolve(__dirname, "../.env") });

export async function connectDb(): Promise<void> {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    const { host, name, port } = mongoose.connection;
    console.log("Connected to mongodb server: ", { host, name, port });
  } catch (error) {
    console.log("mongoose connect Error: ", error);
  }
}
