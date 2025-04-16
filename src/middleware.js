import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(request) {
  const tokenPin = request.cookies.get("tokenPin")?.value
  const token = request.cookies.get("token")?.value;
  let isExpired = true;
  if (token) {
    try {
      const decoded = jwt.decode(token);
      if (decoded && decoded.exp) {
        isExpired = decoded.exp < Date.now() / 1000;
      } else {
        isExpired = true;
      }
    } catch (error) {
      console.error("Error decoding token:", error.message);
      isExpired = true;
    }
  }
  const pathname = request.nextUrl.pathname.replace(/\/$/, "");

  const allowedPaths = [
    "/login",
    "/login/SignUp",
    "/login/ForgotPassword",
    "/login/UpdatePassword",
    "/login/UpdatePasswordSuccess",
  ];
  const isAllowedPath = allowedPaths.some((path) => pathname.startsWith(path)) && !pathname.startsWith("/login/VerifyPin");
  if (isAllowedPath) {
    if (token && pathname.startsWith("/login") && !isExpired) {
      return NextResponse.redirect(new URL("/pages/Dashboard", request.url));
    }
    if (!token && pathname.startsWith("/login/createpin") && !tokenPin) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (!token && tokenPin) {
      if(pathname.startsWith("/pages")){
        return NextResponse.redirect(new URL("/login/VerifyPin", request.url));
      }
    }
    if(token && tokenPin){
      if(pathname === "/login/CreatePin" || pathname === "/login/VerifyPin" ){
        return NextResponse.redirect(new URL("/pages/Dashboard", request.url));
      }
    }
    if (token && !isExpired) {
      if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/pages/Dashboard", request.url));
      }
    }
    if (!token && isExpired && !tokenPin) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/","/login/:path*", "/pages/:path*"],
};
