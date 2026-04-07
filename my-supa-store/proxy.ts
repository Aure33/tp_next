import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-change-in-production-min-32-chars"
)

// A/B Testing - 50/50 split
function getABVariant(request: Request): "A" | "B" {
  const url = new URL(request.url)
  
  // Check if forced via query param
  const forcedVariant = url.searchParams.get("ab_prefetch")
  if (forcedVariant === "A" || forcedVariant === "B") {
    return forcedVariant as "A" | "B"
  }
  
  // Check existing cookie
  const abCookie = request.headers.get("cookie")?.match(/ab_variant=([^;]+)/)
  if (abCookie) {
    return abCookie[1] as "A" | "B"
  }
  
  // Random draw - 50/50
  const random = Math.random()
  return random < 0.5 ? "A" : "B"
}

export default async function proxy(request: Request) {
  const { pathname } = new URL(request.url)
  const response = NextResponse.next()
  
  // A/B Testing - Apply to all routes
  const abVariant = getABVariant(request)
  response.cookies.set("ab_variant", abVariant, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })
  
  // Get session cookie (only for protected routes)
  const sessionCookie = request.headers.get("cookie")?.match(/session=([^;]+)/)
  
  if (!sessionCookie) {
    // No session - redirect to login for protected routes
    if (pathname.startsWith("/admin") || pathname === "/account") {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    return response
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
    // Invalid token - redirect to login for protected routes
    if (pathname.startsWith("/admin") || pathname === "/account") {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
