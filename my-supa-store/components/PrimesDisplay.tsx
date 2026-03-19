interface PrimesResult {
  count: number;
  sum: number;
  limit: number;
}

interface PrimesDisplayProps {
  title: string;
  data: PrimesResult;
  time: number;
}

export function PrimesDisplay({ title, data, time }: PrimesDisplayProps) {
  const isCached = title.toLowerCase().includes('cache');
  
  return (
    <div className={`rounded-[2rem] border p-8 ${isCached ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
      <h3 className={`text-lg font-bold mb-4 ${isCached ? 'text-green-400' : 'text-red-400'}`}>
        {title}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Limite:</span>
          <span className="text-white font-mono">{data.limit.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Nombres premiers:</span>
          <span className="text-white font-mono">{data.count.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Somme totale:</span>
          <span className="text-white font-mono">{data.sum.toLocaleString()}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-white/10">
          <span className="text-gray-500">Temps:</span>
          <span className={`font-mono font-bold ${isCached ? 'text-green-400' : 'text-red-400'}`}>
            {time.toFixed(0)}ms
          </span>
        </div>
      </div>
    </div>
  );
}
