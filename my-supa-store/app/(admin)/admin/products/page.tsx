import { prisma } from "@/utils/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#0a0a0a]/60 p-8 rounded-[2rem] border border-white/[0.05] backdrop-blur-3xl">
        <div>
          <h1 className="text-4xl font-script bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-600">
            Catalogue
          </h1>
          <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
            {products.length} produits
          </p>
        </div>
        <button className="bg-gradient-to-r from-white via-gray-200 to-gray-400 text-black py-3 px-8 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]">
          + Ajouter
        </button>
      </div>

      {/* Products Grid - Same style as home page */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product: any, index: number) => {
          const images = JSON.parse(product.images);
          return (
            <div
              key={product.id}
              className="group flex flex-col bg-[#0c0c0c]/80 rounded-[2rem] overflow-hidden border border-white/[0.03] transition-all duration-700 hover:border-white/10 hover:bg-[#111111]/90 shadow-2xl hover:shadow-blue-500/5 transform hover:-translate-y-2 card-glow animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505]">
                <Image
                  src={images.main}
                  alt={product.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s] grayscale-[0.3] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                
                {product.stock === 0 && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-red-500 text-[9px] font-black uppercase px-3 py-1.5 rounded-full border border-red-500/20 tracking-[0.2em]">
                    Épuisé
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full" />
                
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h2>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-black text-gray-300">
                    {product.price.toFixed(2)}€
                  </span>
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest border border-white/5 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                {/* Admin Actions */}
                <div className="flex items-center justify-end mt-4 pt-4 border-t border-white/[0.05]">
                  <Link 
                    href={`/admin/products/edit/${product.id}`}
                    className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-all mr-6"
                  >
                    Modifier
                  </Link>
                  <button className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 transition-all">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
