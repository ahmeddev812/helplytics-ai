"use client";

import { useState, useMemo, Suspense } from "react";
import { RequestCard } from "@/components/requests/RequestCard";
import { RequestFilters } from "@/components/requests/RequestFilters";
import { MOCK_REQUESTS } from "@/lib/mock-data";
import { useLocalStorage } from "@/lib/hooks";
import { Sparkles, Compass, TrendingUp, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SortField = "createdAt" | "urgency" | "title";
type SortOrder = "asc" | "desc";

function ExploreContent() {
  const [page, setPage] = useState(0);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [settings] = useLocalStorage("ha_user_settings", { itemsPerPage: 12 });

  const itemsPerPage = settings.itemsPerPage || 12;
  const allRequests = MOCK_REQUESTS;

  const sorted = useMemo(() => {
    const sorted = [...allRequests].sort((a, b) => {
      let cmp = 0;
      if (sortField === "createdAt") {
        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === "urgency") {
        const urgencyOrder = { URGENT: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        cmp = (urgencyOrder[a.urgency as keyof typeof urgencyOrder] || 0) - (urgencyOrder[b.urgency as keyof typeof urgencyOrder] || 0);
      } else {
        cmp = a.title.localeCompare(b.title);
      }
      return sortOrder === "desc" ? -cmp : cmp;
    });
    return sorted;
  }, [allRequests, sortField, sortOrder]);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
    setPage(0);
  };

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                <Compass className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Explore Requests</h1>
                <p className="text-slate-300 text-sm sm:text-base mt-1">Browse community requests and offer your help.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold">{allRequests.length} Active Requests</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters + Sort */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md rounded-xl shadow-sm border border-slate-200/50 p-4 -mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter Requests</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
              {[
                { field: "createdAt" as SortField, label: "Newest" },
                { field: "urgency" as SortField, label: "Urgency" },
                { field: "title" as SortField, label: "Title" },
              ].map((opt) => (
                <button
                  key={opt.field}
                  onClick={() => toggleSort(opt.field)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                    sortField === opt.field
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {opt.label}
                  {sortField === opt.field && (
                    <ArrowUpDown className={cn("h-3 w-3", sortOrder === "asc" && "rotate-180")} />
                  )}
                </button>
              ))}
            </div>
            <RequestFilters />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900">{paginated.length}</span> of{" "}
            <span className="font-bold text-slate-900">{sorted.length}</span> requests
          </p>
        </div>
      </div>

      {/* Requests Grid */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-4">
            <Compass className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No requests found</h3>
          <p className="text-slate-500 max-w-sm">
            No requests match your current filters. Try adjusting your criteria or create a new request.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {paginated.map((request, index) => (
              <div
                key={request.id}
                className="animate-in fade-in zoom-in duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <RequestCard request={request} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={cn(
                    "w-8 h-8 rounded-xl text-xs font-bold transition-all",
                    page === i
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="space-y-8 p-4 sm:p-6 animate-pulse">
        <div className="h-48 rounded-2xl bg-slate-100" />
        <div className="h-16 rounded-xl bg-slate-100" />
        <div className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-48 rounded-2xl bg-slate-100" />)}
        </div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
