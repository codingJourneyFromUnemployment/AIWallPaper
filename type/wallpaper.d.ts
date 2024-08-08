import mongoose, { Document } from "mongoose";

export interface Wallpaper {
  img_url: string;
  _id?: mongoose.Schema.Types.ObjectId;
  img_description?: string;
  img_size?: string;
  img_creator?: mongoose.Schema.Types.ObjectId;
  img_created_at?: Date;
}
