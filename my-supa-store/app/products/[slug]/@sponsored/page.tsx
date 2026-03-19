import { getSponsoredProducts } from '@/utils/graphql';
import SponsoredSection from '@/components/SponsoredSection';

export default async function SponsoredSlot() {
  const products = await getSponsoredProducts();
  return <SponsoredSection initialProducts={products} />;
}
