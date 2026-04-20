import { getRequests } from "@/server/actions/requests.actions";
import { RequestCard } from "@/components/requests/RequestCard";
import { RequestFilters } from "@/components/requests/RequestFilters";

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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Requests</h1>
          <p className="text-muted-foreground">Browse community requests and offer your help.</p>
        </div>
        <RequestFilters />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {requests.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <p className="text-muted-foreground">No requests found matching your filters.</p>
          </div>
        ) : (
          requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))
        )}
      </div>
    </div>
  );
}
