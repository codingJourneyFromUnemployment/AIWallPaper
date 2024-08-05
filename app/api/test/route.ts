import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  const res = NextResponse.json(
    {
      statuscode : 200,
      message : `Hello ${name}`
    }
  )

  return res;
}