"use server"

import { prisma } from "@/utils/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const productSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  slug: z.string().min(1, "Le slug est requis"),
  description: z.string().min(1, "La description est requise"),
  price: z.coerce.number().positive("Le prix doit être positif"),
  currency: z.string().length(3, "Devise invalide"),
  stock: z.coerce.number().int().min(0, "Le stock ne peut être négatif"),
  sku: z.string().min(1, "Le SKU est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  brand: z.string().min(1, "La marque est requise"),
})

type FormState = {
  errors?: Record<string, string[]>
  message?: string
}

export async function updateProduct(
  id: string,
  prevState: FormState | undefined,
  formData: FormData
): Promise<FormState> {
  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    currency: formData.get("currency"),
    stock: formData.get("stock"),
    sku: formData.get("sku"),
    category: formData.get("category"),
    brand: formData.get("brand"),
  })

  if (!validatedFields.success) {
    const errors: Record<string, string[]> = {}
    for (const [key, value] of Object.entries(validatedFields.error.flatten().fieldErrors)) {
      errors[key] = value
    }
    return { errors }
  }

  const { name, slug, description, price, currency, stock, sku, category, brand } = validatedFields.data

  // Check if slug already exists for another product
  const existingProduct = await prisma.product.findFirst({
    where: { slug, NOT: { id } },
  })

  if (existingProduct) {
    return { errors: { slug: ["Ce slug existe déjà"] } }
  }

  // Check if sku already exists for another product
  const existingSku = await prisma.product.findFirst({
    where: { sku, NOT: { id } },
  })

  if (existingSku) {
    return { errors: { sku: ["Ce SKU existe déjà"] } }
  }

  await prisma.product.update({
    data: {
      name,
      slug,
      description,
      price,
      currency,
      stock,
      sku,
      category,
      brand,
    },
    where: { id },
  })

  // Invalidate cache
  revalidatePath("/")
  revalidatePath("/admin/products")

  redirect("/admin/products")
}
