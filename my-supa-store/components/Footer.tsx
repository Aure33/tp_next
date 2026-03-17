import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/[0.05] transition-all duration-500 py-16 mt-24 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <span className="text-2xl font-script bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-600">
            My Supa Store
          </span>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mt-3 opacity-50">
            Beyond the ordinary.
          </p>
        </div>
        
        <div className="flex space-x-12">
          <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
            Legal
          </Link>
          <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
            Privacy
          </Link>
        </div>
      </div>
      
      <div className="mt-16 flex items-center justify-center">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-700 opacity-30">
          &copy; {new Date().getFullYear()} Supa Tech Industries.
        </p>
      </div>
    </footer>
  );
}
