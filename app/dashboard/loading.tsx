import { Skeleton } from "@/components/ui/skeleton"; // Make sure you have this component

export default function DashboardLoading() {
  return (
    <main className="max-sm:min-h-screen md:h-screen md:max-h-screen">
      <div className="fixed w-full backdrop-blur-3xl z-50 h-16 px-2 sm:px-4">
        <div className="m-auto py-3 flex items-end justify-between gap-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold grow">
            Metrytics Dashboard
          </h1>
          <div className="flex gap-4">
            <Skeleton className="h-9 w-34 rounded-md border" />
            <Skeleton className="h-9 w-26 rounded-md border" />
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

          <div className="px-6 flex-1 overflow-hidden flex flex-col">
            <div className="flex flex-col h-full justify-between gap-4">
              <div className="rounded-md border overflow-hidden h-full p-2 md:px-4 flex flex-col">
                <div className="flex border-b">
                  <Skeleton className="h-10 flex-1 px-2 py-3" />
                  <Skeleton className="h-10 flex-1 px-2 py-3" />
                  <Skeleton className="h-10 flex-1 px-2 py-3" />
                  <Skeleton className="h-10 flex-1 px-2 py-3" />
                  <Skeleton className="h-10 flex-1 px-2 py-3" />
                </div>
                <div className="flex-grow space-y-2 py-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex border-b border-transparent">
                      <Skeleton className="h-8 flex-1 px-2 py-1" />
                      <Skeleton className="h-8 flex-1 px-2 py-1" />
                      <Skeleton className="h-8 flex-1 px-2 py-1" />
                      <Skeleton className="h-8 flex-1 px-2 py-1" />
                      <Skeleton className="h-8 flex-1 px-2 py-1" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end py-1">
                <div className="flex items-center gap-x-2 md:gap-x-4 lg:gap-x-6">
                  <div className="flex items-center gap-x-2">
                    <Skeleton className="h-5 w-20" />{" "}
                    <Skeleton className="h-8 w-[70px]" />
                  </div>
                  <Skeleton className="h-5 w-[100px]" />
                  <div className="flex items-center gap-x-2">
                    <Skeleton className="hidden h-8 w-8 p-0 lg:flex" />{" "}
                    <Skeleton className="h-8 w-8 p-0" />
                    <Skeleton className="h-8 w-8 p-0" />
                    <Skeleton className="hidden h-8 w-8 p-0 lg:flex" />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
