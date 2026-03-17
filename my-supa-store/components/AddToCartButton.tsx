"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/domains/catalog/types";
import { useState } from "react";

export default function AddToCartButton({ 
  product, 
  disabled 
}: { 
  product: Product, 
  disabled: boolean 
}) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    setAdding(true);
    addItem(product);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <button 
      onClick={handleAdd}
      disabled={disabled || adding}
      className={`relative group w-full py-5 px-10 rounded-2xl text-sm font-black transition-all duration-300 transform shadow-xl uppercase tracking-[0.2em] overflow-hidden ${
        disabled || adding
          ? "bg-gray-100/30 dark:bg-gray-800/50 text-gray-500 dark:text-gray-500 cursor-not-allowed" 
          : "bg-gradient-to-r from-gray-600 to-gray-400 hover:from-gray-500 hover:to-gray-300 hover:-translate-y-1 text-white hover:shadow-2xl active:scale-95"
      }`}
    >
      <span className={`flex items-center justify-center transition-opacity ${adding ? "opacity-0" : "opacity-100"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {disabled ? "Vendu pour le moment" : "Ajouter au panier"}
      </span>
      
      {adding && (
        <span className="absolute inset-0 flex items-center justify-center text-green-400 animate-in zoom-in slide-in-from-bottom duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
          Ajouté !
        </span>
      )}
    </button>
  );
}
