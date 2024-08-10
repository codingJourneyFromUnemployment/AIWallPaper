import mongoose from "mongoose";
import { User } from "../type/user";

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  generatedWallpapers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallpaper",
    },
  ],
});
  
const UserModel = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
