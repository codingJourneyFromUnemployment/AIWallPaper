import { NextResponse } from "next/server";
import { handleUserAuth } from "@/utils/userAuth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const host = headers().get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const user = await handleUserAuth();
    return NextResponse.redirect(`${protocol}://${host}/`);
  } catch (error) {
    console.error("Error in auth callback", error);
    return NextResponse.redirect("/login");
  }
}