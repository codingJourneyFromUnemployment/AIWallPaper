import { NextResponse } from "next/server";
import { Wallpaper } from "@/type/wallpaper";

export async function GET(req: Request) {
  try {
    const wallpapers: Wallpaper[] = [
      {
        img_description: "A beautiful wallpaper 1",
        img_url: "https://loremflickr.com/320/240",
      },
      {
        img_description: "A beautiful wallpaper 2",
        img_url: "https://loremflickr.com/320/240",
      },
      {
        img_description: "A beautiful wallpaper 3",
        img_url: "https://loremflickr.com/320/240",
      },
      {
        img_description: "A beautiful wallpaper 4",
        img_url: "https://loremflickr.com/320/240",
      },
      {
        img_description: "A beautiful wallpaper 5",
        img_url: "https://loremflickr.com/320/240",
      },
      {
        img_description: "A beautiful wallpaper 6",
        img_url: "https://loremflickr.com/320/240",
      },
    ];
    return NextResponse.json({
      message: "ok",
      statuscode: 200,
      data: wallpapers,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}