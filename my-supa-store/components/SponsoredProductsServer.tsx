import { fetchMockShopProducts } from '@/utils/graphql';
import SponsoredProducts from './SponsoredProducts';

async function SponsoredProductsList() {
  const products = await fetchMockShopProducts(4);
  return <SponsoredProducts products={products} />;
}

export default function SponsoredProductsServerWithRefresh() {
  return <SponsoredProductsList />;
}
