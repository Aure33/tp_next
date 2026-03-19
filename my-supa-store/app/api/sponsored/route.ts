import { NextResponse } from 'next/server';
import { getSponsoredProducts } from '@/utils/graphql';

export async function GET() {
  try {
    const products = await getSponsoredProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch sponsored products:', error);
    return NextResponse.json([]);
  }
}
