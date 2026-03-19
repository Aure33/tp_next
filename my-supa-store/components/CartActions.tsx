'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartActions({ itemId, quantity, cartId }: { itemId: string; quantity: number; cartId: string }) {
  const [count, setCount] = useState(quantity);
  const router = useRouter();

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const res = await fetch(`/api/cart/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity, cartId }),
    });

    if (res.ok) {
      setCount(newQuantity);
      router.refresh();
    }
  };

  const removeItem = async () => {
    const res = await fetch(`/api/cart/${itemId}?cartId=${cartId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center bg-white/5 rounded-full">
        <button
          onClick={() => updateQuantity(count - 1)}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          -
        </button>
        <span className="w-8 text-center text-white font-bold">{count}</span>
        <button
          onClick={() => updateQuantity(count + 1)}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          +
        </button>
      </div>
      <button
        onClick={removeItem}
        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
