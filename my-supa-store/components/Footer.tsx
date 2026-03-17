import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            My Supa Store
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            La meilleure boutique Supabase de l&apos;univers.
          </p>
        </div>
        
        <div className="flex space-x-6">
          <Link href="/terms" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
            Conditions
          </Link>
          <Link href="/privacy" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
            Confidentialité
          </Link>
        </div>
      </div>
      
      <div className="mt-8 border-t border-gray-100 dark:border-gray-800/60 pt-8 flex items-center justify-center">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} My Supa Store. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
