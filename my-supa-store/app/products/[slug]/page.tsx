import ProductContent from '@/components/ProductContent';
import { Product } from '@/domains/catalog/types';
import { prisma } from '@/utils/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug: string }>;
};

function mapDbToProduct(dbProduct: any): Product {
  return {
    ...dbProduct,
    images: JSON.parse(dbProduct.images),
    specs: JSON.parse(dbProduct.specs),
    similar: JSON.parse(dbProduct.similar),
  };
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const dbProduct = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!dbProduct) return { title: 'Produit non trouvé' };

  return {
    title: `${dbProduct.name} | My Supa Store`,
    description: dbProduct.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const dbProduct = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!dbProduct) notFound();
  
  const product: Product = mapDbToProduct(dbProduct);

  return (
    <article className="max-w-6xl mx-auto px-6 py-16 lg:py-24 bg-[#0a0a0a]/60 rounded-[3rem] border border-white/[0.05] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-12 backdrop-blur-3xl">
      <Link
        href="/"
        className="inline-flex items-center text-[10px] font-black text-gray-500 hover:text-white mb-16 transition-all duration-300 uppercase tracking-[0.4em] group"
      >
        <span className="transform group-hover:-translate-x-2 transition-transform duration-300 mr-4">&larr;</span> Explore Catalog
      </Link>

      <ProductContent product={product} />
    </article>
  );
}
