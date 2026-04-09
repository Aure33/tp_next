"use client"

import { useState } from "react"
import { updateProduct } from "./actions"
import { Product } from "@prisma/client"

type ProductFormProps = {
  product: Product
}

type FormState = {
  message?: string
  errors?: Record<string, string[]>
}

export function ProductEditForm({ product }: ProductFormProps) {
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true)
    setMessage("")
    setErrors({})

    try {
      const result = await updateProduct(product.id, undefined, formData)
      
      if (result?.errors) {
        setErrors(result.errors)
      }
      if (result?.message) {
        setMessage(result.message)
      }
    } catch (error) {
      setMessage("Une erreur est survenue")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Error message */}
      {message && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm text-center">{message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
            Nom du produit
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={product.name}
            required
            className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all"
          />
          {errors?.name && (
            <p className="text-red-400 text-xs mt-2">{errors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="slug" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            defaultValue={product.slug}
            required
            className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all"
          />
          {errors?.slug && (
            <p className="text-red-400 text-xs mt-2">{errors.slug[0]}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={product.description}
            required
            rows={4}
            className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all resize-none"
          />
          {errors?.description && (
            <p className="text-red-400 text-xs mt-2">{errors.description[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
            Prix
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={product.price}
            required
            className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all"
          />
          {errors?.price && (
            <p className="text-red-400 text-xs mt-2">{errors.price[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="currency" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
            Devise
          </label>
          <input
            id="currency"
            name="currency"
            type="text"
            defaultValue={product.currency}
            required
            maxLength={3}
            className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all"
          />
          {errors?.currency && (
            <p className="text-red-400 text-xs mt-2">{errors.currency[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="stock" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            defaultValue={product.stock}
            required
            className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all"
          />
          {errors?.stock && (
            <p className="text-red-400 text-xs mt-2">{errors.stock[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="sku" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
            SKU
          </label>
          <input
            id="sku"
            name="sku"
            type="text"
            defaultValue={product.sku}
            required
            className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all"
          />
          {errors?.sku && (
            <p className="text-red-400 text-xs mt-2">{errors.sku[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
            Catégorie
          </label>
          <input
            id="category"
            name="category"
            type="text"
            defaultValue={product.category}
            required
            className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all"
          />
          {errors?.category && (
            <p className="text-red-400 text-xs mt-2">{errors.category[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="brand" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
            Marque
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            defaultValue={product.brand}
            required
            className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all"
          />
          {errors?.brand && (
            <p className="text-red-400 text-xs mt-2">{errors.brand[0]}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-white/[0.05]">
        {/* Test error button - removed as it needs useActionState */}
        <div />

        <div className="flex space-x-4">
          <a
            href="/admin/products"
            className="px-6 py-3 border border-white/[0.05] rounded-lg text-gray-400 hover:text-white hover:border-white/[0.2] transition-all text-[10px] font-black uppercase tracking-widest"
          >
            Annuler
          </a>
          <button
            type="submit"
            disabled={isPending}
            className="px-8 py-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-black rounded-lg hover:opacity-90 disabled:opacity-50 transition-all text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98]"
          >
            {isPending ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </form>
  )
}
