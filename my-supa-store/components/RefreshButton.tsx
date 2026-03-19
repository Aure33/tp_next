'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RefreshButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRefresh = async () => {
    setLoading(true);
    
    await fetch('/api/revalidate', { method: 'POST' });
    
    router.refresh();
    setLoading(false);
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={loading}
      className="ml-4 px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full border border-white/10 transition-all disabled:opacity-50"
    >
      {loading ? 'Actualisation...' : '↻ Actualiser'}
    </button>
  );
}
