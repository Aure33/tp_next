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
      {sponsored}
      {similar}
    </>
  );
}
