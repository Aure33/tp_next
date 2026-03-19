import Link from 'next/link';
import Image from 'next/image';
import { SponsoredProduct } from '@/types/sponsored';
import RefreshButton from './RefreshButton';

interface SponsoredProductsProps {
  products: SponsoredProduct[];
}

export default function SponsoredProducts({ products }: SponsoredProductsProps) {
  if (!products.length) return null;

  return (
    <section className="mt-24">
      <div className="flex items-center gap-4 mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
          Sponsorisé
        </span>
        <RefreshButton />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/sponsored/${product.handle}`}
            className="group block"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0c0c0c] mb-4 border border-amber-500/10 group-hover:border-amber-500/30 transition-colors">
              {product.images.edges[0] && (
                <Image
                  src={product.images.edges[0].node.url}
                  alt={product.images.edges[0].node.altText || product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              )}
              <div className="absolute top-3 left-3 bg-amber-500/90 text-black text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Sponsorisé
              </div>
            </div>
            <p className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
              {product.title}
            </p>
            <p className="text-sm font-black text-amber-400 mt-1">
              {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}€ 
              <span className="text-gray-500 text-xs ml-1">
                {product.priceRange.minVariantPrice.currencyCode}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
