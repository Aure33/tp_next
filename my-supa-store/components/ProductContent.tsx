import { Suspense } from 'react';
import ProductTabs from './ProductTabs';
import AddToCartButton from './AddToCartButton';
import SimilarProducts from './SimilarProducts';
import { Product } from '@/domains/catalog/types';

export default function ProductContent({ product }: { product: Product }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
        <div className="space-y-12">
          <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden bg-[#0c0c0c] shadow-3xl border border-white/[0.03] group">
            <img
              src={product.images.main}
              alt={product.name}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2s] ease-out grayscale-[0.2] group-hover:grayscale-0"
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
                  <img
                    src={img}
                    alt={`${product.name} gallery ${idx + 1}`}
                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

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

          <Suspense fallback={<div className="h-32 bg-white/[0.02] rounded-[2rem] animate-pulse mb-16" />}>
            <ProductTabs product={product} />
          </Suspense>

          <div className="mt-auto pt-8">
            <AddToCartButton product={product} disabled={product.stock === 0} />
            <p className="text-center text-[9px] font-black text-gray-700 mt-10 tracking-[0.5em] uppercase opacity-40">
              SKU: {product.sku}
            </p>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="mt-24">
            <div className="h-6 w-32 bg-gray-800/50 rounded animate-pulse mb-12" />
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
        <SimilarProducts productId={product.id} />
      </Suspense>
    </>
  );
}
