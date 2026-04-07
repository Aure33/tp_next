"use server"

import { redirect } from "next/navigation"
import { z } from "zod"
import { prisma } from "@/utils/prisma"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"
import { cookies } from "next/headers"

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-change-in-production-min-32-chars"
)

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
})

async function createSession(user: { id: string; email: string; name: string | null; role: string }) {
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET)

  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
}

export async function login(formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return { message: "Email ou mot de passe incorrect" }
  }

  const { email, password } = validatedFields.data

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || !user.password) {
    return { message: "Email ou mot de passe incorrect" }
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return { message: "Email ou mot de passe incorrect" }
  }

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })

  redirect("/")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/")
}
