import { connectToAtlas } from "./database";
import UserModel from "@/models/user";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function handleUserAuth() {
  try {
    await connectToAtlas();
    const { userId } = auth();
    const clerkUser = await currentUser();

    if (!userId || !clerkUser) {
      throw new Error("You must log in first");
    }

    const existingUser = await UserModel.findOne({ clerkId: userId });

    if (existingUser) {
      return existingUser;
    } else {
      const newUser = new UserModel({
        clerkId: userId,
        username:
          clerkUser.username ||
          `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
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

