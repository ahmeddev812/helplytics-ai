import { getRequests } from "@/server/actions/requests.actions";
import { RequestCard } from "@/components/requests/RequestCard";
import { RequestFilters } from "@/components/requests/RequestFilters";
import { Sparkles, Compass, TrendingUp, Filter } from "lucide-react";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const category = query.category as string;
  const urgency = query.urgency as any;
  
  const filters: any = { status: "OPEN" };
  if (category && category !== "all") filters.category = category;
  if (urgency && urgency !== "all") filters.urgency = urgency;

  const requests = await getRequests(filters);

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Header Section with Gradient */}
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
                <p className="text-slate-300 text-sm sm:text-base mt-1">
                  Browse community requests and offer your help.
                </p>
              </div>
            </div>
            
            {/* Stats Badge */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold">{requests.length} Active Requests</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md rounded-xl shadow-sm border border-slate-200/50 p-4 -mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter Requests</span>
          </div>
          <RequestFilters />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900">{requests.length}</span> requests
          </p>
        </div>
        <div className="text-xs text-slate-400">
          Updated just now
        </div>
      </div>

      {/* Requests Grid */}
      {requests.length === 0 ? (
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
        <div className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request, index) => (
            <div
              key={request.id}
              className="animate-in fade-in zoom-in duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RequestCard request={request} />
            </div>
          ))}
        </div>
      )}

      {/* Load More Section (Optional) */}
      {requests.length > 0 && requests.length >= 12 && (
        <div className="flex justify-center pt-8">
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 font-semibold text-sm hover:from-slate-200 hover:to-slate-300 transition-all duration-300">
            Load More Requests
          </button>
        </div>
      )}
    </div>
  );
}