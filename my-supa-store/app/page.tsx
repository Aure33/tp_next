import { Product } from "@/domains/catalog/types";
import { prisma } from "@/utils/prisma";
import Image from "next/image";
import Link from "next/link";

// Helper to project database product to domain model
function mapDbToProduct(dbProduct: any): Product {
  return {
    ...dbProduct,
    images: JSON.parse(dbProduct.images),
    specs: JSON.parse(dbProduct.specs),
    similar: JSON.parse(dbProduct.similar),
  };
}

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch all products via Prisma RSC
  const dbProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  const products: Product[] = dbProducts.map(mapDbToProduct);

  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="text-center bg-white/30 p-12 rounded-3xl border border-white/10 shadow-sm backdrop-blur-sm">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400 mb-6 uppercase">
          Bienvenue sur My Supa Store
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-3xl text-gray-300 font-script italic">
          Des produits premium pour votre quotidien...
        </p>
      </section>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group flex flex-col bg-white/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-white/10 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100/50">
              <Image
                src={product.images.main}
                alt={`Photo de ${product.name}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.stock === 0 && (
                <div className="absolute top-4 right-4 bg-red-500/80 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-lg z-10 tracking-widest backdrop-blur-sm">
                  Épuisé
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-gray-100 group-hover:text-gray-300 transition-colors">
                  {product.name}
                </h2>
                <span className="text-lg font-black text-gray-300 ml-2">
                  {product.price}€
                </span>
              </div>
              <p className="text-sm text-gray-400 font-medium line-clamp-2 mb-6 flex-grow uppercase tracking-tight">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                <span className="text-[10px] font-black text-gray-400 bg-white/10 px-2 py-1 rounded uppercase tracking-[0.1em]">
                  {product.category}
                </span>
                <span className="text-sm font-bold text-gray-300 group-hover:text-gray-200 transition-colors uppercase tracking-tight">
                  Détails &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
