import { PrismaClient } from '@prisma/client'
import productsData from '../domains/catalog/data/products.json'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding products...')
  
  // Clean up existing products to prevent duplicates on rerun
  await prisma.product.deleteMany()

  for (const product of productsData as any[]) {
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
