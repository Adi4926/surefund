export default function LegalPageLayout({
  title,
  updatedDate,
  children,
}: {
  title: string;
  updatedDate: string;
  children: React.ReactNode;
}) {
  return (
    <main className="section max-w-3xl">
      <h1 className="text-3xl font-bold text-primary md:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-primary/40">Last updated: {updatedDate}</p>
      <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-primary/70">
        {children}
      </div>
    </main>
  );
}
