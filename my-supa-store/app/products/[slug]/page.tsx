import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/utils/prisma";
import { Product } from "@/domains/catalog/types";

// Static props replacement props type
type PageProps = {
  params: Promise<{ slug: string }>;
};

// Helper (DRY: in a real app, this goes to a repository layer)
function mapDbToProduct(dbProduct: any): Product {
  return {
    ...dbProduct,
    images: JSON.parse(dbProduct.images),
    specs: JSON.parse(dbProduct.specs),
    similar: JSON.parse(dbProduct.similar),
  };
}

export async function generateStaticParams() {
  const dbProducts = await prisma.product.findMany({
    select: { slug: true },
  });
  return dbProducts.map((p: { slug: string }) => ({ slug: p.slug }));
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
        {/* Gallery - Dark Presentation */}
        <div className="space-y-12">
          <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden bg-[#0c0c0c] shadow-3xl border border-white/[0.03] group">
            <Image
              src={product.images.main}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2s] ease-out grayscale-[0.2] group-hover:grayscale-0"
              priority
            />
            {product.stock === 0 && (
              <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-xl text-red-500 font-black text-[10px] px-6 py-3 rounded-full shadow-2xl z-20 uppercase tracking-[0.3em] border border-red-500/20">
                Rupture
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-40" />
          </div>
          
          {product.images.gallery && product.images.gallery.length > 1 && (
            <div className="grid grid-cols-3 gap-8">
              {product.images.gallery.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/[0.03] hover:border-white/10 hover:scale-105 transition-all duration-500 bg-[#0c0c0c]">
                  <Image
                    src={img}
                    alt={`${product.name} gallery ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 33vw, 16vw"
                    className="object-cover opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info - High Contrast Minimal */}
        <div className="flex flex-col">
          <div className="mb-12">
            <span className="inline-block px-4 py-1.5 text-[9px] font-black tracking-[0.3em] text-blue-500 bg-blue-500/5 border border-blue-500/10 rounded-full mb-8 uppercase">
              {product.category}
            </span>
            <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-6">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 font-black uppercase tracking-[0.2em] opacity-60">
              Designed by {product.brand}
            </p>
          </div>

          <div className="mb-16">
            <span className="text-6xl font-black text-gray-200 tracking-tighter flex items-start">
              {product.price}<span className="text-2xl mt-2 ml-1">€</span>
            </span>
          </div>

          <div className="mb-16">
            <h3 className="text-[10px] font-black border-b border-white/[0.05] pb-4 mb-8 uppercase tracking-[0.4em] text-gray-500">
              Description
            </h3>
            <p className="text-gray-400 font-medium text-lg leading-relaxed leading-[1.8]">
              {product.description}
            </p>
          </div>

          <div className="mb-16 p-10 bg-white/[0.02] rounded-[2rem] border border-white/[0.05] backdrop-blur-2xl">
            <h3 className="text-[10px] font-black mb-8 text-gray-500 uppercase tracking-[0.4em]">
              Technical Specs
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6">
              {product.specs && Object.entries(product.specs).map(([key, value]) => (
                <li key={key} className="flex justify-between border-b border-white/[0.03] pb-3">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-black text-gray-300 text-[11px] uppercase tracking-tighter">
                    {typeof value === 'boolean' ? (value ? 'YES' : 'NO') : value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-8">
            <AddToCartButton product={product} disabled={product.stock === 0} />
            <p className="text-center text-[9px] font-black text-gray-700 mt-10 tracking-[0.5em] uppercase opacity-40">
              SKU: {product.sku}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
