import * as fal from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";
import { enhancePrompt } from "../../../utils/create-prompt";
import { connectToAtlas } from "@/utils/database";
import WallpaperModel from "@/models/wallpaper";
import UserModel from "@/models/user";

interface Result {
  images: {
    url: string;
    content_type: string;
  }[],
  prompt: string;
}

// export const runtime = "edge";


export async function POST(req: Request) {
  try {

    const { prompt, userId } = await req.json();
    console.log("starting to connect to atlas");
    await connectToAtlas();
    console.log("connected to atlas");

    if (!prompt || !userId) {
      return NextResponse.json(
        { error: "Missing prompt or userId, please provide both" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ clerkId: userId });

    const enhancedPrompt = await enhancePrompt(prompt);
    console.log("enhanced prompt", enhancedPrompt);

    const result: Result = await fal.subscribe("fal-ai/flux-realism", {
      input: {
        prompt: enhancedPrompt,
        num_inference_steps: 12,
        enable_safety_checker: false,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS" && update.logs) {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    console.log("generate success");

    if (!result.images || result.images.length === 0) {
      console.error("No images generated");
      return NextResponse.json(
        { error: "No images generated" },
        { status: 500 }
      );
    }

    const url = result.images[0].url;
    const newWallpaper = new WallpaperModel({
      img_url: url,
      img_description: prompt,
      img_creator: user._id,
      img_created_at: new Date(),
    });

    await newWallpaper.save();

    return NextResponse.json({
      url,
      prompt: result.prompt,
      enhancePrompt,
      description: prompt,
      statuscode: 200,
    })


  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error, Failed to create wallpaper" }, { status: 500 });
  }
}
