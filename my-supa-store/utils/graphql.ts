import type { SponsoredProduct } from "@/domains/catalog/entity/sponsoredProduct";

const MOCK_SHOP_GRAPHQL = "https://mock.shop/api/2024-01/graphql.json";
const MOCK_SHOP_PRODUCT_BASE = "https://mock.shop/products";

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      featuredImage {
        url
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

type MockShopProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: { url: string } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

type MockShopResponse = {
  data?: {
    products?: {
      nodes: MockShopProductNode[];
    };
  };
  errors?: Array<{ message: string }>;
};

function mapNodeToSponsoredProduct(node: MockShopProductNode): SponsoredProduct {
  const price = node.priceRange?.minVariantPrice;
  return {
    id: node.id,
    handle: node.handle,
    name: node.title,
    description: node.description ?? "",
    price: price ? parseFloat(price.amount) : 0,
    currency: price?.currencyCode ?? "USD",
    imageUrl: node.featuredImage?.url ?? "",
    url: `${MOCK_SHOP_PRODUCT_BASE}/${node.handle}`,
  };
}

export async function fetchMockShopProducts(limit: number = 6): Promise<SponsoredProduct[]> {
  const res = await fetch(MOCK_SHOP_GRAPHQL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: PRODUCTS_QUERY,
      variables: { first: limit },
    }),
  });

  if (!res.ok) {
    throw new Error(`Mock.shop API error: ${res.status}`);
  }

  const json = (await res.json()) as MockShopResponse;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  const nodes = json.data?.products?.nodes ?? [];
  return nodes.map(mapNodeToSponsoredProduct);
}

type ProductByHandleResponse = {
  data?: { productByHandle: MockShopProductNode | null };
  errors?: Array<{ message: string }>;
};

export async function fetchMockShopProductByHandle(handle: string): Promise<SponsoredProduct | null> {
  const res = await fetch(MOCK_SHOP_GRAPHQL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    }),
  });

  if (!res.ok) return null;
  const json = (await res.json()) as ProductByHandleResponse;
  if (json.errors?.length || !json.data?.productByHandle) return null;
  return mapNodeToSponsoredProduct(json.data.productByHandle);
}

export async function getAllSponsoredHandles(): Promise<string[]> {
  const products = await fetchMockShopProducts(20);
  return products.map(p => p.handle);
}
