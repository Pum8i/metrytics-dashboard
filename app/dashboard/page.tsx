"use client";

import ClientCard from "@/components/client-card";
import DataTable from "@/components/data-table";
import StatsCard from "@/components/stats-card";
import { IAnalyticsSummary, IVisitorData } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOut, RefreshCw } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { logout } from "../lib/actions";

export default function Dashboard() {
  const [visitors, setVisitors] = useState<IVisitorData[]>([]);
  const [summary, setSummary] = useState<IAnalyticsSummary | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [, formAction, isPending] = useActionState(logout, undefined);

  const fetchData = async () => {
    try {
      setLoading(true);
      const visitorsRes = await fetch("/api/analytics");

      if (!visitorsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const { visitors, totalVisitors, uniqueVisitors, pages, referrers } =
        await visitorsRes.json();

      setVisitors(visitors);
      setSummary({
        totalVisits: totalVisitors,
        topReferrers: referrers,
        topPages: pages,
        uniqueVisitors,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (initialLoad) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl font-semibold">Loading analytics data...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {loading && (
        <div className="flex h-screen z-50 items-center justify-center absolute inset-0 bg-background/50">
          <div className="text-2xl font-semibold">Refreshing data...</div>
        </div>
      )}
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-bold mb-8 grow">Analytics Dashboard</h1>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={fetchData}
                disabled={loading}
              >
                <RefreshCw className={loading ? "animate-spin" : ""} />
                <div className="hidden md:block">Refresh Data</div>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="md:hidden">
              <p>Refresh Data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <form action={formAction}>
                <Button
                  variant={"outline"}
                  className="cursor-pointer"
                  type="submit"
                  disabled={isPending}
                >
                  <LogOut />
                  <div className="hidden md:block">Sign Out</div>
                </Button>
              </form>
            </TooltipTrigger>
            <TooltipContent className="md:hidden">
              <p>Refresh Data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatsCard
            title="Total Visits"
            value={summary.totalVisits}
            icon="👁️"
          />
          <StatsCard
            title="Unique Visitors"
            value={summary.uniqueVisitors}
            icon="👤"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {summary && (
          <>
            {" "}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {summary.topPages.map((page, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="">{page.page}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {page.visits} visits
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {summary.topReferrers.map((referrer, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="">{referrer.referrer}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {referrer.visits} visits
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </div>
      <Card className=" p-6 mb-8">
        <CardHeader>
          <CardTitle>Recent Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4"></h2>
          {visitors.length > 0 ? (
            <DataTable visitors={visitors.slice(0, 10)} />
          ) : (
            <p>No visitor data available</p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visitors.slice(0, 6).map((visitor) => (
          <ClientCard key={visitor.id} visitor={visitor} />
        ))}
      </div>
    </div>
  );
}
