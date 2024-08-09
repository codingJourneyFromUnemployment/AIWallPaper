import { NextResponse } from "next/server";
import { Wallpaper } from "@/type/wallpaper";
import { connectToAtlas } from "@/utils/database";
import WallpaperModel from "@/models/wallpaper";

export async function GET(req: Request) {
  try {
    await connectToAtlas();
  
    const wallpapers : Wallpaper[] = await WallpaperModel.find();

    
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