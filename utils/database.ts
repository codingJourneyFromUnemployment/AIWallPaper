import mongoose from "mongoose";

let isConnected = false;

export const connectToAtlas = async () => {
  if(isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("MongoDB URI is missing");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error:any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
}
