import * as fal from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";

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

    const result : Result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: prompt,
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
      statuscode: 200,
    })


  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
