function computePrimes(limit: number): {
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
  console.log(`[computePrimes] Calculé pour ${limit} en ${duration.toFixed(0)}ms`);
  return { count, sum, limit };
}

export function getCachedPrimes(limit: number) {
  const result = computePrimes(limit);
  return result;
}
