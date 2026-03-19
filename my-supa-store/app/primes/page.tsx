import { unstable_cache } from 'next/cache';
import { PrimesDisplay } from '@/components/PrimesDisplay';

async function computePrimesAsync(limit: number): Promise<{
  count: number;
  sum: number;
  limit: number;
}> {
  const start = performance.now();
  
  const isPrime = new Uint8Array(limit + 1).fill(1);
  isPrime[0] = isPrime[1] = 0;
  for (let i = 2; i * i <= limit; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  let count = 0;
  let sum = 0;
  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) {
      count++;
      sum += i;
    }
  }
  const duration = performance.now() - start;
  console.log(`[CACHE] Calculé en ${duration.toFixed(0)}ms`);
  return { count, sum, limit };
}

function computePrimesSync(limit: number): {
  count: number;
  sum: number;
  limit: number;
} {
  const start = performance.now();
  const isPrime = new Uint8Array(limit + 1).fill(1);
  isPrime[0] = isPrime[1] = 0;
  for (let i = 2; i * i <= limit; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  let count = 0;
  let sum = 0;
  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) {
      count++;
      sum += i;
    }
  }
  const duration = performance.now() - start;
  console.log(`[NO CACHE] Calculé en ${duration.toFixed(0)}ms`);
  return { count, sum, limit };
}

const getCachedPrimes = unstable_cache(
  computePrimesAsync,
  ['primes'],
  { revalidate: 60, tags: ['primes'] }
);

const LIMIT = 1000000;

async function CachedSection() {
  const start = performance.now();
  const result = await getCachedPrimes(LIMIT);
  const time = performance.now() - start;
  return <PrimesDisplay title="Avec unstable_cache" data={result} time={time} />;
}

function UncachedSection() {
  const start = performance.now();
  const result = computePrimesSync(LIMIT);
  const time = performance.now() - start;
  return <PrimesDisplay title="Sans cache (sync)" data={result} time={time} />;
}

export const dynamic = 'force-dynamic';

export default async function PrimesPage() {
  return (
    <div className="max-w-4xl mx-auto py-16">
      <h1 className="text-4xl font-black text-white mb-4">Crible d&apos;Ératosthène</h1>
      <p className="text-gray-400 mb-8">
        Calcul des nombres premiers jusqu&apos;à {LIMIT.toLocaleString()}. Rafraîchis la page pour voir la différence de performance.
      </p>
      <p className="text-amber-400 mb-8 text-sm">
        Ouvrez la console (F12) pour voir les temps de calcul.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CachedSection />
        <UncachedSection />
      </div>

      <div className="bg-[#0a0a0a]/60 rounded-[2rem] border border-white/[0.05] p-8">
        <h2 className="text-xl font-bold text-white mb-4">Explication</h2>
        <ul className="space-y-3 text-gray-400">
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">→</span>
            <span><strong className="text-green-400">Avec unstable_cache:</strong> Premier appel = calcul. Appels suivants pendant 60s = résultat en cache (instantané).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-400 mt-1">→</span>
            <span><strong className="text-red-400">Sans cache:</strong> Chaque appel = nouveau calcul complet.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
