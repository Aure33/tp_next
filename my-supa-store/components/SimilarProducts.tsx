import { prisma } from '@/utils/prisma';
import Image from 'next/image';
import PrefetchLink from '@/components/PrefetchLink';

async function getSimilarProducts(productId: string) {
  const similarProducts = await prisma.similarProduct.findMany({
    where: { productId },
    orderBy: { score: 'asc' },
    take: 4,
    include: {
      similarProduct: true,
    },
  });

  return similarProducts.map((sp) => ({
    ...sp.similarProduct,
    images: JSON.parse(sp.similarProduct.images),
  }));
}

export default async function SimilarProducts({ productId }: { productId: string }) {
  const products = await getSimilarProducts(productId);

  if (!products.length) {
    return null;
  }

  return (
    <section className="mt-24">
      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-12">
        Vous aimerez aussi
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <PrefetchLink
            key={product.id}
            href={`/products/${product.slug}`}
            className="group block"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0c0c0c] mb-4">
              <Image
                src={product.images.main}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
              {product.brand}
            </p>
            <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              {product.name}
            </p>
            <p className="text-sm font-black text-gray-400 mt-1">
              {product.price}€
            </p>
          </PrefetchLink>
        ))}
      </div>
    </section>
  );
}
