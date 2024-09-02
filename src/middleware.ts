// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function middlewareError(req: NextRequest) {
  console.log(process.env.MIDDLEWARE_BYPASS);
  /*const protectedPaths = ["/hello"];
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );*/

  if (process.env.MIDDLEWARE_BYPASS != null) {
    return NextResponse.next();
  }

  if (true) {
    const token = req.cookies.get("auth-token");

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Token missing, please Reconnect wallet." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const JWTToken = token.value;
    console.log(token);
    console.log(token.value);
    try {
      const secretKey = new TextEncoder().encode(JWT_SECRET);

      const decodedToken = jwt.verify(JWTToken, JWT_SECRET);
      console.log(decodedToken);
      // ตรวจสอบว่า token หมดอายุหรือไม่
      if (Date.now() >= (decodedToken as any).exp * 1000) {
        return new NextResponse(
          JSON.stringify({
            message: "Token expired, please Reconnect wallet.",
          }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
    } catch (error) {
      console.log("error", error);
      return new NextResponse(
        JSON.stringify({ message: "Invalid token, please Reconnect wallet." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
}

export function middleware(req: NextRequest) {
  console.log(process.env.MIDDLEWARE_BYPASS);
  /*const protectedPaths = ["/hello"];
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );*/

  if (process.env.MIDDLEWARE_BYPASS != null) {
    return NextResponse.next();
  }

  if (true) {
    const token = req.cookies.get("auth-token");

    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: "Token missing, please Reconnect wallet." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const JWTToken = token.value;

    try {
      const secretKey = new TextEncoder().encode(JWT_SECRET);

      const decodedToken = jwtVerify(JWTToken, secretKey);

      // ตรวจสอบว่า token หมดอายุหรือไม่
      if (Date.now() >= (decodedToken as any).exp * 1000) {
        return new NextResponse(
          JSON.stringify({
            error: "Token expired, please Reconnect wallet.",
          }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
    } catch (error) {
      console.log("error", error);
      return new NextResponse(
        JSON.stringify({ error: "Invalid token, please Reconnect wallet." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/protected/:path*"],
};
