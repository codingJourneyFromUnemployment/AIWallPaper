import mongoose from "mongoose";
import colors from "colors";

let isConnected = false;

export const connectToAtlas = async () => {
  if(isConnected) {
    console.log("Already connected to MongoDB".green);
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("MongoDB URI is missing".red);
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true;
  } catch (error:any) {
    console.error(`Error connecting to MongoDB: ${error.message}`.red);
  }
}
