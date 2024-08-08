import { Wallpaper } from "../type/wallpaper";
import mongoose from "mongoose";

const wallpaperSchema = new mongoose.Schema({
  img_url: {
    type: String,
    required: true,
  },
  img_description: {
    type: String,
  },
  img_size: {
    type: String,
  },
  img_creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  img_created_at: {
    type: Date,
    default: Date.now,
  },
});

const WallpaperModel = mongoose.model<Wallpaper>("Wallpaper", wallpaperSchema);

export default WallpaperModel;

