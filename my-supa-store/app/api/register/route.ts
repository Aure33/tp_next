import { NextResponse } from "next/server"
import { prisma } from "@/utils/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  name: z.string().min(1, "Le nom est requis"),
})

export async function POST(request: Request) {
  const formData = await request.formData()

  const validatedFields = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  })

  if (!validatedFields.success) {
    return NextResponse.json(
      { errors: validatedFields.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { email, password, name } = validatedFields.data

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json(
      { errors: { email: ["Cet email est déjà utilisé"] } },
      { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  return NextResponse.redirect(
    new URL("/auth/login?registered=true", request.url),
    { status: 302 }
  )
}
