export const dynamic = 'force-dynamic';

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { message: 'Données chargées !' };
}

export default async function TestLoadingPage() {
  const data = await getData();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-2xl font-bold mb-4">Page de test du loader</h1>
      <p>{data.message}</p>
    </div>
  );
}
