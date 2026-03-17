import { prisma } from "@/utils/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 uppercase">
            Gestion du Catalogue
          </h1>
          <p className="mt-1 text-sm text-gray-500 font-medium">
            Total : {products.length} produits enregistrés
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition duration-300 transform hover:-translate-y-1 shadow-md">
          + Ajouter un produit
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f8fafc]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Produit</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Catégorie</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Prix</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Stock</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {products.map((product: any) => {
              const images = JSON.parse(product.images);
              return (
                <tr key={product.id} className="hover:bg-gray-50/50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-12 w-12 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                        <Image
                          src={images.main}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-400 font-medium font-mono">{product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-4 font-bold rounded-md bg-blue-50 text-blue-600 uppercase">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-black text-gray-900">{product.price.toFixed(2)} €</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-bold ${product.stock === 0 ? "text-red-500" : "text-green-600"}`}>
                      {product.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/products/edit/${product.id}`} className="text-blue-600 hover:text-blue-800 font-bold ml-4">Modifier</Link>
                    <button className="text-red-500 hover:text-red-700 font-bold ml-4">Supprimer</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
