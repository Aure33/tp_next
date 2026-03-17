import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      currency: true,
      stock: true,
      sku: true,
      category: true,
      brand: true,
      images: true,
      specs: true,
      similar: true,
    },
  });

  return NextResponse.json(products);
}
