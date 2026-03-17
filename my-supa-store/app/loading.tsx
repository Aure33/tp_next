function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <span className="ml-4 text-gray-600">Chargement...</span>
    </div>
  );
}

export default function Loading() {
  return <Spinner />;
}
