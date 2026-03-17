import Link from 'next/link';
import CartSummary from './CartSummary';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 dark:bg-[#0a0a0a]/75 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center space-x-4">
            <Link href="/" className="text-2xl font-script bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-80 transition-opacity">
              My Supa Store
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <CartSummary />
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:border-gray-700 transition-colors"
              >
                Accueil
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:border-gray-700 transition-colors"
              >
                Produits
              </Link>
              <Link
                href="/admin/products"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-colors uppercase tracking-[0.1em]"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
