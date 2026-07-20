"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Download } from "lucide-react";
import { LEAD_STATUSES, PRODUCT_TYPES } from "@/lib/constants";

export default function LeadFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParam("search", search);
  }

  function exportUrl() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("limit");
    return `/api/leads/export?${params.toString()}`;
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <form onSubmit={handleSearchSubmit} className="relative flex-1 md:max-w-sm">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary/30"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, mobile, email, PAN..."
          className="w-full rounded-xl border border-primary/10 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-secondary"
        />
      </form>

      <div className="flex flex-wrap gap-3">
        <select
          defaultValue={searchParams.get("status") || ""}
          onChange={(e) => updateParam("status", e.target.value)}
          className="rounded-xl border border-primary/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-secondary"
        >
          <option value="">All Statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          defaultValue={searchParams.get("productType") || ""}
          onChange={(e) => updateParam("productType", e.target.value)}
          className="rounded-xl border border-primary/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-secondary"
        >
          <option value="">All Products</option>
          {PRODUCT_TYPES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <a
          href={exportUrl()}
          className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-light"
        >
          <Download size={16} />
          Export
        </a>
      </div>
      {isPending && <span className="sr-only">Loading...</span>}
    </div>
  );
}
