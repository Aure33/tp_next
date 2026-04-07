"use server"

import { prisma } from "@/utils/prisma"
import { redirect } from "next/navigation"
import { revalidateTag } from "next/cache"
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

type ProductUpdateState = {
  errors?: {
    name?: string[]
    slug?: string[]
    description?: string[]
    price?: string[]
    currency?: string[]
    stock?: string[]
    sku?: string[]
    category?: string[]
    brand?: string[]
  }
  message?: string
} | undefined

export async function updateProduct(
  id: string,
  prevState: ProductUpdateState,
  formData: FormData
) {
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
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, slug, description, price, currency, stock, sku, category, brand } = validatedFields.data

  // Check if slug already exists for another product
  const existingProduct = await prisma.product.findFirst({
    where: { slug, NOT: { id } },
  })

  if (existingProduct) {
    return {
      errors: { slug: ["Ce slug existe déjà"] },
    }
  }

  // Check if sku already exists for another product
  const existingSku = await prisma.product.findFirst({
    where: { sku, NOT: { id } },
  })

  if (existingSku) {
    return {
      errors: { sku: ["Ce SKU existe déjà"] },
    }
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

  // Invalidate products cache
  revalidateTag("products")

  redirect("/admin/products")
}
