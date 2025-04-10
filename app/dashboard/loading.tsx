import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <main className="max-sm:min-h-screen md:h-screen md:max-h-screen">
      <div className="fixed w-full backdrop-blur-3xl z-50 h-16 px-2 sm:px-4">
        <div className="m-auto py-3 flex items-end justify-between gap-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold grow">
            Metrytics Dashboard
          </h1>
          <div className="flex gap-4">
            <Skeleton className="h-9 w-10 md:w-36 rounded-md border" />
            <Skeleton className="h-9 w-10 md:w-28 rounded-md border" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 pb-2 pt-16 h-dvh relative">
        <div className="bg-card text-card-foreground flex flex-col gap-2 md:gap-6 rounded-xl border py-6 shadow-sm h-full">
          <div className="px-6">
            <Skeleton className="h-14 w-full rounded-lg p-[3px] flex items-center justify-around gap-1">
              <Skeleton className="h-[calc(100%-6px)] w-1/3 rounded-md bg-background/30" />
              <Skeleton className="h-[calc(100%-6px)] w-1/3 rounded-md bg-background/30" />
              <Skeleton className="h-[calc(100%-6px)] w-1/3 rounded-md bg-background/30" />
            </Skeleton>
          </div>

          <div className="px-6 flex-1 overflow-hidden flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:w-2/3 gap-4 h-full">
              <Skeleton className="rounded-xl border h-1/2 w-full flex flex-col"></Skeleton>

              <Skeleton className="rounded-xl border h-1/2 w-full flex flex-col"></Skeleton>
            </div>

            <div className="flex flex-col md:w-1/3 gap-4 h-full">
              <Skeleton className="rounded-xl border h-1/2 w-full flex flex-col pb-0"></Skeleton>
              <Skeleton className="rounded-xl border h-1/2 w-full flex flex-col pb-0"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
