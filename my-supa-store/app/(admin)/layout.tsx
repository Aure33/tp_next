import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-blue-600">Admin - My Supa Store</Link>
          <nav className="flex space-x-4">
            <Link href="/admin/products" className="text-sm font-medium text-gray-700 hover:text-blue-600">Produits</Link>
            <Link href="/" className="text-sm font-medium text-gray-500">Voir le site</Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow py-8 bg-white max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
