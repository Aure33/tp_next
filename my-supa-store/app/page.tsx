import { Product } from "@/domains/catalog/types";
import { prisma } from "@/utils/prisma";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import SponsoredSection from "@/components/SponsoredSection";
import { getSponsoredProducts } from "@/utils/graphql";

function mapDbToProduct(dbProduct: any): Product {
  return {
    ...dbProduct,
    images: JSON.parse(dbProduct.images),
    specs: JSON.parse(dbProduct.specs),
    similar: JSON.parse(dbProduct.similar),
  };
}

export const dynamic = 'force-dynamic';

function SponsoredSectionSkeleton() {
  return (
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
  );
}

export default async function HomePage() {
  const dbProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  const products: Product[] = dbProducts.map(mapDbToProduct);
  const sponsoredProducts = await getSponsoredProducts();

  return (
    <div className="space-y-24 py-16">
      <section className="relative text-center py-20 px-6 overflow-hidden rounded-[3rem] border border-white/5 bg-[#080808]/40 backdrop-blur-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-600">
          My Supa Store
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-2xl md:text-3xl text-gray-400 font-script italic leading-relaxed opacity-80">
          L&apos;excellence, dans son expression la plus pure...
        </p>
        <div className="mt-12 flex justify-center space-x-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20 self-center" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">
            Curated Tech
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20 self-center" />
        </div>
      </section>

      <Suspense fallback={<SponsoredSectionSkeleton />}>
        <SponsoredSection initialProducts={sponsoredProducts} />
      </Suspense>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group flex flex-col bg-[#0c0c0c]/80 rounded-[2rem] overflow-hidden border border-white/[0.03] transition-all duration-700 hover:border-white/10 hover:bg-[#111111]/90 shadow-2xl hover:shadow-blue-500/5 transform hover:-translate-y-2"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505]">
              <Image
                src={product.images.main}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s] ease-out grayscale-[0.3] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-60" />
              
              {product.stock === 0 && (
                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md text-red-500 text-[9px] font-black uppercase px-3 py-1.5 rounded-full border border-red-500/20 shadow-xl z-10 tracking-[0.2em]">
                  Épuisé
                </div>
              )}
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                  {product.name}
                </h2>
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-black text-gray-300">
                  {product.price}€
                </span>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest border border-white/5 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
