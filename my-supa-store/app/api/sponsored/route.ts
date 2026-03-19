import { NextResponse } from 'next/server';
import { fetchMockShopProducts } from '@/utils/graphql';

export async function GET() {
  try {
    const products = await fetchMockShopProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch sponsored products:', error);
    return NextResponse.json([]);
  }
}
