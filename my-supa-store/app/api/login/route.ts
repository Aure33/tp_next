import { NextResponse } from "next/server"
import { prisma } from "@/utils/prisma"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"

export async function POST(request: Request) {
  const formData = await request.formData()
  
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return NextResponse.redirect(
      new URL("/auth/login?error=invalid", request.url)
    )
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || !user.password) {
    return NextResponse.redirect(
      new URL("/auth/login?error=invalid", request.url)
    )
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return NextResponse.redirect(
      new URL("/auth/login?error=invalid", request.url)
    )
  }

  const SECRET = new TextEncoder().encode(
    process.env.AUTH_SECRET || "dev-secret-change-in-production-min-32-chars"
  )

  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET)

  const response = NextResponse.redirect(new URL("/", request.url))
  response.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return response
}
