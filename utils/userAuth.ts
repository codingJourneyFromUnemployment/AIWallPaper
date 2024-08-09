import { connectToAtlas } from "./database";
import UserModel from "@/models/user";

export async function handleUserAuth(clerkUser: any) {
  try {
    await connectToAtlas();

    const existingUser = await UserModel.findOne({ clerkId: clerkUser.id });
    if (existingUser) {
      return existingUser;
    } else {
      const newUser = new UserModel({
        clerkId: clerkUser.id,
        username: clerkUser.username,
        createdAt: new Date(),
      });

      await newUser.save();
      return newUser;
    }
  } catch (error) {
    console.error("Error in handleUserAuth", error);
    throw error;
  }
}

