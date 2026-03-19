import { getSponsoredProducts } from '@/utils/graphql';
import SponsoredProducts from '@/components/SponsoredProducts';

export default async function SponsoredSlot() {
  const products = await getSponsoredProducts();
  return <SponsoredProducts products={products} />;
}
