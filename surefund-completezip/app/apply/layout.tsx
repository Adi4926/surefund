import Link from "next/link";

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/5 bg-white px-6 py-4">
        <Link href="/" className="font-heading text-lg font-bold text-primary">
          Sure<span className="text-secondary">Fund</span>
        </Link>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10 md:px-0">{children}</main>
    </div>
  );
}
