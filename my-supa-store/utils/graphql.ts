import { SponsoredProduct } from '@/types/sponsored';

const MOCK_SPONSORED_PRODUCTS: SponsoredProduct[] = [
  {
    id: 'gid://shopify/Product/1',
    title: 'Casque Bluetooth Premium',
    handle: 'casque-bluetooth-premium',
    descriptionHtml: '<p>Casque sans fil avec suppression de bruit active. Autonomie de 30 heures.</p>',
    onlineStoreUrl: 'https://example-shop.com/products/casque-bluetooth-premium',
    tags: ['audio', 'bluetooth', 'premium'],
    priceRange: {
      minVariantPrice: { amount: '149.99', currencyCode: 'EUR' },
    },
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', altText: 'Casque Premium' } },
        { node: { url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600', altText: 'Casque Premium Vue 2' } },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/2',
    title: 'Montre Connectée Sport',
    handle: 'montre-connectee-sport',
    descriptionHtml: '<p>Suivi GPS, cardio, oxygène sanguin. Étanche 50m.</p>',
    onlineStoreUrl: 'https://example-shop.com/products/montre-connectee-sport',
    tags: ['wearable', 'fitness', 'gps'],
    priceRange: {
      minVariantPrice: { amount: '299.99', currencyCode: 'EUR' },
    },
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', altText: 'Montre Connectée' } },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/3',
    title: 'Enceinte Portable Waterproof',
    handle: 'enceint-portable-waterproof',
    descriptionHtml: '<p>Son 360°, waterproof IPX7, 24h d\'autonomie.</p>',
    onlineStoreUrl: 'https://example-shop.com/products/enceint-portable-waterproof',
    tags: ['audio', 'portable', 'waterproof'],
    priceRange: {
      minVariantPrice: { amount: '89.99', currencyCode: 'EUR' },
    },
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600', altText: 'Enceinte' } },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/4',
    title: 'Drone Mini 4K',
    handle: 'drone-mini-4k',
    descriptionHtml: '<p>Caméra 4K, vol 25 min, pliable et ultra léger.</p>',
    onlineStoreUrl: 'https://example-shop.com/products/drone-mini-4k',
    tags: ['drone', 'camera', '4k'],
    priceRange: {
      minVariantPrice: { amount: '449.99', currencyCode: 'EUR' },
    },
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600', altText: 'Drone' } },
      ],
    },
  },
];

let fetchCount = 0;
let lastFetchTime = 0;

export async function getSponsoredProducts(): Promise<SponsoredProduct[]> {
  const start = performance.now();
  
  fetchCount++;
  lastFetchTime = Date.now();
  
  console.log(`[mockShop] fetch products (attempt #${fetchCount}) ${(performance.now() - start).toFixed(0)}ms`);
  
  return MOCK_SPONSORED_PRODUCTS;
}

export function getCacheInfo() {
  return {
    fetchCount,
    lastFetchTime,
  };
}

export async function getSponsoredProduct(handle: string): Promise<SponsoredProduct | null> {
  const start = performance.now();
  
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  console.log(`[mockShop] fetch product ${handle} (${(performance.now() - start).toFixed(0)}ms)`);
  
  return MOCK_SPONSORED_PRODUCTS.find(p => p.handle === handle) || null;
}

export async function getAllSponsoredHandles(): Promise<string[]> {
  return MOCK_SPONSORED_PRODUCTS.map(p => p.handle);
}
