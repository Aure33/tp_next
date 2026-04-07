'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PrefetchLink from '@/components/PrefetchLink';
import type { SponsoredProduct } from '@/domains/catalog/entity/sponsoredProduct';

interface SponsoredSectionProps {
  initialProducts: SponsoredProduct[];
}

export default function SponsoredSection({ initialProducts }: SponsoredSectionProps) {
  const [products, setProducts] = useState<SponsoredProduct[]>(initialProducts);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Already handled in PrefetchLink component
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    await fetch('/api/revalidate', { method: 'POST' });
    router.refresh();
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <section className="mt-24">
      <div className="flex items-center gap-4 mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
          Sponsorisé
        </span>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="ml-4 px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full border border-white/10 transition-all disabled:opacity-50"
        >
          {isRefreshing ? 'Actualisation...' : '↻ Actualiser'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {isRefreshing ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="block">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0c0c0c] mb-4 border border-amber-500/10">
                  <div className="w-full h-full bg-gray-800 animate-pulse" />
                </div>
                <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse mb-2" />
                <div className="h-4 w-1/2 bg-gray-800 rounded animate-pulse" />
              </div>
            ))}
          </>
        ) : (
          products.map((product) => (
            <PrefetchLink
              key={product.id}
              href={`/sponsored/${product.handle}`}
              className="group block"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0c0c0c] mb-4 border border-amber-500/10 group-hover:border-amber-500/30 transition-colors">
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
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
                {product.name}
              </p>
              <p className="text-sm font-black text-amber-400 mt-1">
                {product.price.toFixed(2)}€ 
                <span className="text-gray-500 text-xs ml-1">
                  {product.currency}
                </span>
              </p>
            </PrefetchLink>
          ))
        )}
      </div>
    </section>
  );
}
