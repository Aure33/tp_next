import SimilarProducts from '@/components/SimilarProducts';
import { prisma } from '@/utils/prisma';

export default async function SimilarSlot({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const dbProduct = await prisma.product.findUnique({
    where: { slug },
  });

  if (!dbProduct) return null;

  return <SimilarProducts productId={dbProduct.id} />;
}
