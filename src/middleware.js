import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const allowedPaths = [
    "/login",
    "/login/SignUp",
    "/login/ForgotPassword",
    "/login/UpdatePassword",
    "/login/UpdatePasswordSuccess",
  ];
  const loggedIn = allowedPaths.includes(request.nextUrl.pathname);
  if (loggedIn) {
    if (token) {
      return NextResponse.redirect(new URL("/pages", request.url));
    }
  } else {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/login/:path*", "/pages/:path*"],
};
