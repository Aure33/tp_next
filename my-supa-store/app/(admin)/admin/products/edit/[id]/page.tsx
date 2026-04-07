import { prisma } from "@/utils/prisma"
import { ProductEditForm } from "./product-form"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-2xl">
        <div className="backdrop-blur-3xl bg-black/40 border border-white/[0.05] rounded-2xl p-8 md:p-12 shadow-xl animate-fade-in-up">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-script bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-600">
                Modifier le produit
              </h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-1">
                Mettez à jour les informations
              </p>
            </div>
            <Link
              href="/admin/products"
              className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all"
            >
              ← Retour
            </Link>
          </div>
          <ProductEditForm product={product} />
        </div>
      </div>
    </div>
  )
}
