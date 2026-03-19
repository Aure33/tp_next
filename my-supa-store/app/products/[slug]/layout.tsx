import { Suspense } from 'react';

function SectionLoading() {
  return (
    <div className="mt-24">
      <div className="h-6 w-32 bg-gray-800/50 rounded animate-pulse mb-12" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-square bg-gray-800/50 rounded-2xl animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-800/50 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-800/50 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductLayout({
  children,
  sponsored,
  similar,
}: {
  children: React.ReactNode;
  sponsored: React.ReactNode;
  similar: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Suspense fallback={<SectionLoading />}>
        {sponsored}
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        {similar}
      </Suspense>
    </>
  );
}
