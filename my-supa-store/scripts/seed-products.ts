import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  const productsData = JSON.parse(
    readFileSync(join(process.cwd(), 'domains/catalog/data/products.json'), 'utf-8')
  );

  console.log('Products to seed:', productsData.length);

  await prisma.product.deleteMany();

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
    });
  }

  const count = await prisma.product.count();
  console.log('Products in DB:', count);
}

main().finally(() => prisma.$disconnect());
