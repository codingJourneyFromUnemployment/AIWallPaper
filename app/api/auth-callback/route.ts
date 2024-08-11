import { handleUserAuth } from "@/utils/userAuth";

export async function GET() {
  try {
    await handleUserAuth();
    // 使用相对 URL 重定向到首页
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  } catch (error) {
    console.error("Error in auth callback", error);
    // 使用相对 URL 重定向到登录页
    return new Response(null, {
      status: 302,
      headers: { Location: "/login" },
    });
  }
}