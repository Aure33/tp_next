import Link from 'next/link';
import { prisma } from '@/utils/prisma';
import { cookies } from 'next/headers';

async function getCartData() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('cart_session_id')?.value;

  if (!sessionId) {
    return { totalCount: 0, totalPrice: 0 };
  }

  const cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: { items: true },
  });

  if (!cart) {
    return { totalCount: 0, totalPrice: 0 };
  }

  const totalCount = cart.items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);

  return { totalCount, totalPrice };
}

export default async function CartSummary() {
  const { totalCount, totalPrice } = await getCartData();

  return (
    <Link 
      href="/cart" 
      className="relative group flex items-center space-x-2 bg-white/20 dark:bg-white/10 px-4 py-2 rounded-full border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-sm"
    >
      <div className="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500/80 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in duration-300 backdrop-blur-sm">
            {totalCount}
          </span>
        )}
      </div>
      <div className="hidden sm:block">
        <span className="text-xs font-black text-gray-300 uppercase tracking-widest">
          {totalPrice.toFixed(2)}€
        </span>
      </div>
    </Link>
  );
}
