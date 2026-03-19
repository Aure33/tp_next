import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchMockShopProductByHandle, getAllSponsoredHandles } from '@/utils/graphql';

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const handles = await getAllSponsoredHandles();
  return handles.map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: PageProps) {
  const { handle } = await params;
  const product = await fetchMockShopProductByHandle(handle);
  
  if (!product) return { title: 'Produit non trouvé' };

  return {
    title: `${product.name} | Sponsored | My Supa Store`,
    description: product.description,
  };
}

export default async function SponsoredProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await fetchMockShopProductByHandle(handle);

  if (!product) notFound();

  return (
    <article className="max-w-6xl mx-auto px-6 py-16 lg:py-24 bg-[#0a0a0a]/60 rounded-[3rem] border border-amber-500/20 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-12 backdrop-blur-3xl">
      <Link
        href="/"
        className="inline-flex items-center text-[10px] font-black text-gray-500 hover:text-amber-400 mb-16 transition-all duration-300 uppercase tracking-[0.4em] group"
      >
        <span className="transform group-hover:-translate-x-2 transition-transform duration-300 mr-4">&larr;</span> Retour
      </Link>

      <div className="flex items-center gap-2 mb-8">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
          Sponsorisé
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
        <div className="space-y-12">
          <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden bg-[#0c0c0c] shadow-3xl border border-white/[0.03] group">
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2s] ease-out"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-40" />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-12">
            <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-6">
              {product.name}
            </h1>
          </div>

          <div className="mb-16">
            <span className="text-6xl font-black text-amber-400 tracking-tighter flex items-start">
              {product.price.toFixed(2)}
              <span className="text-2xl mt-2 ml-1">
                {product.currency}
              </span>
            </span>
          </div>

          <div className="mb-16">
            <h3 className="text-[10px] font-black border-b border-white/[0.05] pb-4 mb-8 uppercase tracking-[0.4em] text-gray-500">
              Description
            </h3>
            <p className="text-gray-400 font-medium text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-auto pt-8">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 text-center">
              <p className="text-amber-400 font-bold mb-2">Produit sponsorisé</p>
              <p className="text-gray-400 text-sm mb-4">
                Ce produit est présenté par un partenaire. Il ne peut pas être ajouté au panier via notre boutique.
              </p>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full transition-colors"
              >
                Voir le produit original
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
