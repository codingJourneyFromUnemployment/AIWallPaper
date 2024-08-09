import mongoose from "mongoose";

export interface User {
  _id: mongoose.Schema.Types.ObjectId
  clerkId: string;
  username: string;
  createdAt: Date;
  generatedWallpapers?: Types.ObjectId[];
}