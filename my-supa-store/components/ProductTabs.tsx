'use client';

import Link from 'next/link';
import { Product } from '@/domains/catalog/types';

export default function ProductTabs({ product, activeTab }: { product: Product; activeTab: string }) {
  return (
    <div className="mb-16">
      <div className="flex gap-1 mb-8">
        <Link
          href={`?tab=description`}
          scroll={false}
          className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all duration-300 ${
            activeTab === 'description'
              ? 'bg-white text-black'
              : 'text-gray-500 hover:text-white bg-white/[0.03] hover:bg-white/[0.08]'
          }`}
        >
          Description
        </Link>
        <Link
          href={`?tab=specs`}
          scroll={false}
          className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all duration-300 ${
            activeTab === 'specs'
              ? 'bg-white text-black'
              : 'text-gray-500 hover:text-white bg-white/[0.03] hover:bg-white/[0.08]'
          }`}
        >
          Spécifications
        </Link>
      </div>

      {activeTab === 'description' && (
        <div className="animate-in fade-in duration-300">
          <p className="text-gray-400 font-medium text-lg leading-relaxed leading-[1.8]">
            {product.description}
          </p>
        </div>
      )}

      {activeTab === 'specs' && (
        <div className="animate-in fade-in duration-300 p-10 bg-white/[0.02] rounded-[2rem] border border-white/[0.05] backdrop-blur-2xl">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6">
            {product.specs && Object.entries(product.specs).map(([key, value]) => (
              <li key={key} className="flex justify-between border-b border-white/[0.03] pb-3">
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="font-black text-gray-300 text-[11px] uppercase tracking-tighter">
                  {typeof value === 'boolean' ? (value ? 'YES' : 'NO') : value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
