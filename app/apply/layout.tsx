import Link from "next/link";
import { headers } from "next/headers";

export default async function ApplyLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const referer = headersList.get("referer") || "";
  
  // URL ya path ke hisab se detect karna ki personal ya business loan hai
  const isBusiness = referer.includes("business-loan") || headersList.get("x-invoke-path")?.includes("business-loan");
  const loanTypeName = isBusiness ? "Business Loan" : "Personal Loan";

  return (
    <div className="min-h-screen bg-background text-primary">
      {/* Header */}
      <header className="border-b border-primary/5 bg-gray-950 px-6 py-4 flex items-center justify-between">
        {/* Custom Logo */}
        <Link href="/" className="flex flex-col items-start px-2 py-1 transition-opacity hover:opacity-90">
          <div className="flex items-baseline font-extrabold tracking-tight text-xl leading-none">
            <span className="text-white">sure</span>
            <span className="text-indigo-500">fund</span>
            <span className="text-gray-400 text-xs font-semibold ml-0.5">.in</span>
          </div>
          <span className="text-[8px] font-bold tracking-[0.25em] text-white/70 uppercase mt-1 text-center w-full">
            Financial Services
          </span>
        </Link>

      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-10 md:px-0">{children}</main>
    </div>
  );
}