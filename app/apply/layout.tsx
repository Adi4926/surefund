import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-primary">
      {/* Header */}
      <header className="border-b border-primary/5 bg-gray-950 px-6 py-4 flex items-center justify-between">
        {/* Custom Logo & Back Button Container */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center justify-center rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            title="Go Back"
          >
            <ArrowLeft size={20} />
          </Link>

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
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-10 md:px-0">{children}</main>
    </div>
  );
}