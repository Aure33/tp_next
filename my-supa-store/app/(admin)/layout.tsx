import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full backdrop-blur-3xl bg-black/40 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-[10px] font-black tracking-[0.2em] text-gray-500 hover:text-white transition-all uppercase">
            Admin - My Supa Store
          </Link>
          <nav className="flex space-x-8">
            <Link href="/admin/products" className="text-[10px] font-black tracking-[0.2em] text-white uppercase hover:text-blue-400 transition-all">
              Produits
            </Link>
            <Link href="/" className="text-[10px] font-black tracking-[0.2em] text-gray-500 hover:text-white transition-all uppercase">
              Voir le site
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow py-12 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
