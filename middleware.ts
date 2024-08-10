import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { handleUserAuth } from "./utils/userAuth";
import { NextResponse } from "next/server";

const protectedRoutes = createRouteMatcher(["/api/generate-image", "/api/auth-callback"]);   

export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) {
    auth().protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
