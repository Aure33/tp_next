import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

interface JsonProduct {
  id: string
  slug: string
  similar?: string[]
  name: string
  description: string
  price: number
  currency: string
  stock: number
  sku: string
  category: string
  brand: string
  images: any
  specs: any
}

async function main() {
  const productsData = JSON.parse(
    readFileSync(join(__dirname, '../domains/catalog/data/products.json'), 'utf-8')
  ) as JsonProduct[]

  console.log('Seeding products...')

  await prisma.similarProduct.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.product.deleteMany()

  for (const product of productsData) {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        currency: product.currency,
        stock: product.stock,
        sku: product.sku,
        category: product.category,
        brand: product.brand,
        images: JSON.stringify(product.images),
        specs: JSON.stringify(product.specs),
        similar: JSON.stringify(product.similar),
      },
    })
  }

  console.log(`Seed OK: ${productsData.length} produits insérés.`)

  const slugToId = new Map(productsData.map((p) => [p.slug, p.id]))
  const similarData: { productId: string; similarProductId: string; score: number }[] = []

  for (const p of productsData) {
    if (!p.similar?.length) continue
    p.similar.forEach((slug, index) => {
      const similarId = slugToId.get(slug)
      if (similarId && similarId !== p.id) {
        similarData.push({
          productId: p.id,
          similarProductId: similarId,
          score: index + 1,
        })
      }
    })
  }

  if (similarData.length) {
    await prisma.similarProduct.createMany({ data: similarData })
    console.log(`Seed OK: ${similarData.length} liens similaires insérés.`)
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
