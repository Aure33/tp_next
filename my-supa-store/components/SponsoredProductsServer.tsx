import { getSponsoredProducts } from '@/utils/graphql';
import SponsoredProducts from './SponsoredProducts';

export default async function SponsoredProductsServer() {
  const products = await getSponsoredProducts();
  return <SponsoredProducts products={products} />;
}
