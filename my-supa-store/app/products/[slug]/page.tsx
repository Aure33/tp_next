import { Suspense, cache } from 'react';
import ProductContent from '@/components/ProductContent';
import SimilarProducts from '@/components/SimilarProducts';
import SponsoredSection from '@/components/SponsoredSection';
import { fetchMockShopProducts } from '@/utils/graphql';
import { Product } from '@/domains/catalog/types';
import { prisma } from '@/utils/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

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

const getProduct = cache(async (slug: string) => {
  await prisma.$connect();
  const dbProduct = await prisma.product.findUnique({
    where: { slug },
  });
  if (!dbProduct) return null;
  return mapDbToProduct(dbProduct);
});

const getProductId = cache(async (slug: string) => {
  await prisma.$connect();
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { id: true },
  });
  return product?.id || null;
});

export async function generateStaticParams() {
  await prisma.$connect();
  const dbProducts = await prisma.product.findMany({
    select: { slug: true },
  });
  return dbProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    return {
      title: 'Produit non trouvé',
      description: "Le produit demandé n'est pas disponible.",
      robots: { index: false, follow: false },
    } satisfies Metadata;
  }

  const keywords = [
    product.name,
    product.category,
    product.brand,
    product.sku,
    'produit tech',
    'my supa store',
  ];

  return {
    title: product.name,
    description: product.description,
    keywords,
    robots: {
      index: product.stock > 0,
      follow: true,
      googleBot: {
        index: product.stock > 0,
        follow: true,
        'max-image-preview': 'large',
      },
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `/products/${product.slug}`,
      siteName: 'My Supa Store',
      type: 'website',
      images: [
        {
          url: product.images.main,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  } satisfies Metadata;
}

function ProductFallback() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 bg-[#0a0a0a]/60 rounded-[3rem] border border-white/[0.05] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-12 backdrop-blur-3xl">
      <div className="h-10 w-48 bg-gray-800/50 rounded animate-pulse mb-16" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
        <div className="aspect-square bg-gray-800/50 rounded-[2.5rem] animate-pulse" />
        <div className="space-y-8">
          <div className="h-4 w-24 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-16 w-3/4 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-12 w-32 bg-gray-800/50 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);
  const productId = await getProductId(resolvedParams.slug);
  const sponsoredProducts = await fetchMockShopProducts(4);

  if (!product) notFound();

  return (
    <article className="max-w-6xl mx-auto px-6 py-16 lg:py-24 bg-[#0a0a0a]/60 rounded-[3rem] border border-white/[0.05] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-12 backdrop-blur-3xl animate-fade-in-up">
      <Link
        href="/"
        className="inline-flex items-center text-[10px] font-black text-gray-500 hover:text-white mb-16 transition-all duration-300 uppercase tracking-[0.4em] group"
      >
        <span className="transform group-hover:-translate-x-2 transition-transform duration-300 mr-4">←</span> Explore Catalog
      </Link>

      <div className="animate-fade-in-up delay-200">
        <ProductContent product={product} />
      </div>

      <Suspense
        fallback={
          <div className="mt-24">
            <div className="h-6 w-40 bg-gray-800/50 rounded animate-pulse mb-12" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-square bg-gray-800/50 rounded-2xl animate-pulse" />
                  <div className="h-3 w-16 bg-gray-800/50 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-800/50 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        }
      >
        {productId && (
          <div className="animate-fade-in-up delay-400">
            <SimilarProducts productId={productId} />
          </div>
        )}
      </Suspense>

      <Suspense
        fallback={
          <div className="mt-24">
            <div className="h-6 w-32 bg-gray-800/50 rounded animate-pulse mb-12" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-square bg-gray-800/50 rounded-2xl animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-800/50 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-800/50 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <div className="animate-fade-in-up delay-600">
          <SponsoredSection initialProducts={sponsoredProducts} />
        </div>
      </Suspense>
    </article>
  );
}
