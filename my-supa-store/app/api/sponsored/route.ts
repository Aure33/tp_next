import { NextResponse } from 'next/server';
import { gql } from '@/utils/graphql';
import { Collection } from '@/types/sponsored';

const COLLECTION_QUERY = `
  query GetCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const data = await gql<{ collection: Collection }>(COLLECTION_QUERY, {
      handle: 'collection-with-products',
    });

    const products = data.collection?.products?.edges?.map((e) => e.node) || [];

    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch sponsored products:', error);
    return NextResponse.json([]);
  }
}
