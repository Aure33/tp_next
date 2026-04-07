"use server"

import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
})

type LoginState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string
} | undefined

export async function login(prevState: LoginState, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
  } catch (error) {
    return {
      message: "Email ou mot de passe incorrect",
    }
  }

  redirect("/")
}
