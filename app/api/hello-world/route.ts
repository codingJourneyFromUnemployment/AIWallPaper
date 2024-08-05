import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json(
    {
      statuscode : 200,
      message : "Hello World"
    }
  )

  return res;
}
