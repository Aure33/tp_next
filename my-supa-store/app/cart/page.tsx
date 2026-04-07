import Link from 'next/link';
import { prisma } from '@/utils/prisma';
import { cookies } from 'next/headers';
import CartActions from '@/components/CartActions';

async function getCart() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('cart_session_id')?.value;

  if (!sessionId) {
    return null;
  }

  return prisma.cart.findUnique({
    where: { sessionId },
    include: { items: true },
  });
}

export default async function CartPage() {
  const cart = await getCart();
  const items = cart?.items || [];

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 animate-fade-in-up">
        <h1 className="text-4xl font-black text-white mb-8">Panier</h1>
        <div className="text-center py-20 bg-[#0a0a0a]/60 rounded-[3rem] border border-white/[0.05] backdrop-blur-3xl">
          <p className="text-gray-400 text-xl mb-8">Votre panier est vide</p>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-black font-black rounded-full hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto py-16">
      <h1 className="text-4xl font-black text-white mb-8 animate-fade-in-up">Panier ({totalItems})</h1>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-6 bg-[#0a0a0a]/60 rounded-[2rem] border border-white/[0.05] p-6 animate-fade-in-up card-glow"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative w-24 h-24 bg-[#0c0c0c] rounded-2xl overflow-hidden flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>

            <div className="flex-grow">
              <h3 className="text-lg font-bold text-white">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.currency}</p>
            </div>

            <div className="text-right">
              <p className="text-xl font-black text-white">
                {(item.price * item.quantity).toFixed(2)}€
              </p>
              <p className="text-gray-500 text-sm">
                {item.price}€ x {item.quantity}
              </p>
            </div>

            <CartActions itemId={item.id} quantity={item.quantity} cartId={cart!.id} />
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#0a0a0a]/60 rounded-[2rem] border border-white/[0.05] p-8 backdrop-blur-3xl animate-fade-in-up delay-400">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-400">Sous-total</span>
          <span className="text-2xl font-black text-white">{total.toFixed(2)}€</span>
        </div>
        <button className="w-full py-5 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-black font-black rounded-2xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]">
          Passer la commande
        </button>
        <Link
          href="/"
          className="block text-center mt-4 text-gray-500 hover:text-white transition-colors"
        >
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}
