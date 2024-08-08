import * as fal from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";
import { enhancePrompt } from "../../../utils/create-prompt";
import { connectToAtlas } from "@/utils/database";
import WallpaperModel from "@/models/wallpaper";

interface Result {
  images: {
    url: string;
    content_type: string;
  }[],
  prompt: string;
}


export async function POST(req: Request) {
  try {
    const { userId, prompt } = await req.json();
    await connectToAtlas();

    if (!userId || !prompt) {
      return NextResponse.json(
        { error: "Missing userId or prompt, Failed to create wallpaper" },
        { status: 400 }
      );
    }

    const enhancedPrompt = await enhancePrompt(prompt);

    const result: Result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: enhancedPrompt,
        num_inference_steps: 10,
        enable_safety_checker: false,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    const url = result.images[0].url;
    const newWallpaper = new WallpaperModel({
      img_url: url,
      img_description: prompt,
      // img_creator: userId,
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
