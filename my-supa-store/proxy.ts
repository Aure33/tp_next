import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-change-in-production-min-32-chars"
)

export default async function proxy(request: Request) {
  const { pathname } = new URL(request.url)
  
  // Get session cookie
  const sessionCookie = request.headers.get("cookie")?.match(/session=([^;]+)/)
  
  if (!sessionCookie) {
    // No session - redirect to login for protected routes
    if (pathname.startsWith("/admin") || pathname === "/account") {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    return NextResponse.next()
  }

  try {
    const { payload } = await jwtVerify(sessionCookie[1], SECRET)
    
    // Check admin routes
    if (pathname.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }
    
    // Account page requires auth
    if (pathname === "/account" && !payload.userId) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    
  } catch {
    // Invalid token - redirect to login
    if (pathname.startsWith("/admin") || pathname === "/account") {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/account"],
}
