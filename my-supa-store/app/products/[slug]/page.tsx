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
    <article className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-white/30 rounded-3xl border border-white/10 shadow-sm mt-8 backdrop-blur-sm">
      <Link
        href="/"
        className="inline-flex items-center text-xs font-black text-gray-400 hover:text-gray-200 mb-10 transition-colors uppercase tracking-[0.2em]"
      >
        &larr; Revenir à l&apos;accueil
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {/* Gallery */}
        <div className="space-y-8">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100/50 shadow-2xl border border-white/10">
            <Image
              src={product.images.main}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {product.stock === 0 && (
              <div className="absolute top-6 right-6 bg-red-500/80 text-white font-black text-xs px-5 py-2.5 rounded shadow-2xl z-20 uppercase tracking-[0.3em] backdrop-blur-sm">
                Rupture
              </div>
            )}
          </div>
          
          {product.images.gallery && product.images.gallery.length > 1 && (
            <div className="grid grid-cols-3 gap-6">
              {product.images.gallery.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-white/10 hover:scale-105 transition-transform duration-300">
                  <Image
                    src={img}
                    alt={`${product.name} gallery ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 33vw, 16vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 text-[10px] font-black tracking-[0.2em] text-gray-300 bg-white/10 rounded mb-4 uppercase">
              {product.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 tracking-tight leading-tight mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-gray-400 font-bold uppercase tracking-tight">
              Par {product.brand}
            </p>
          </div>

          <div className="mb-12">
            <span className="text-5xl font-black text-gray-200 tracking-tighter">
              {product.price}€
            </span>
          </div>

          <div className="prose prose-sm max-w-none mb-10">
            <h3 className="text-xs font-black border-b border-white/10 pb-3 mb-6 uppercase tracking-widest text-gray-400">
              Description détaillée
            </h3>
            <p className="text-gray-300 font-medium leading-[2em]">
              {product.description}
            </p>
          </div>

          <div className="mb-12 p-8 bg-white/20 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-xs font-black mb-6 text-gray-400 uppercase tracking-widest">
              Fiche technique
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              {product.specs && Object.entries(product.specs).map(([key, value]) => (
                <li key={key} className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-black text-gray-200 text-xs">
                    {typeof value === 'boolean' ? (value ? 'OUI' : 'NON') : value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <AddToCartButton product={product} disabled={product.stock === 0} />
            <p className="text-center text-[10px] font-bold text-gray-500 mt-6 tracking-widest uppercase">
              RÉF: {product.sku}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
