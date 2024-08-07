import * as fal from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";
import { enhancePrompt } from "../../../utils/create-prompt";

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

    if (!userId || !prompt) {
      return NextResponse.json(
        { error: "Missing userId or prompt" },
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
    return NextResponse.json({
      url,
      prompt: result.prompt,
      enhancePrompt,
      statuscode: 200,
    })


  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
