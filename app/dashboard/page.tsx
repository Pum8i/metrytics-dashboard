"use client";

import { IAnalyticsSummary, IVisitorData } from "@/app/types";
import ClientCard from "@/components/client-card";
import DataTable from "@/components/data-table";
import NavBar from "@/components/nav";
import Summary from "@/components/sections/summary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionState, useEffect, useState } from "react";
import { logout } from "../lib/actions";
import Tops from "@/components/sections/tops";

export default function Dashboard() {
  const [visitors, setVisitors] = useState<IVisitorData[]>([]);
  const [summary, setSummary] = useState<IAnalyticsSummary | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [, formAction, isPending] = useActionState(logout, undefined);

  const fetchData = async () => {
    try {
      setLoading(true);
      const visitorsRes = await fetch("/api/analytics/visitor");

      if (!visitorsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const {
        visitors,
        totalVisitors,
        uniqueVisitors,
        pages,
        referrers,
        countries,
        cities,
      } = await visitorsRes.json();

      setVisitors(visitors);
      setSummary({
        countries,
        cities,
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

  const Section = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return <section className="mb-4">{children}</section>;
  };

  return (
    <main>
      <NavBar
        formAction={formAction}
        isPending={isPending}
        fetchData={fetchData}
        loading={loading}
      />
      <div className="container mx-auto px-4 pt-24 relative">
        {loading && (
          <div className="flex h-screen z-50 items-center justify-center absolute inset-0 bg-background/50">
            <div className="text-2xl font-semibold">Refreshing data...</div>
          </div>
        )}
        {summary && (
          <Section>
            <Summary summary={summary} />
          </Section>
        )}

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summary && (
              <>
                <Tops title="Top Pages" tops={summary.topPages} />
                <Tops title="Top Referrers" tops={summary.topReferrers} />
                <Tops title="Top Countries" tops={summary.countries} />
                <Tops title="Top Cities" tops={summary.cities} />
              </>
            )}
          </div>
        </Section>
        <Section>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Recent Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              {visitors.length > 0 ? (
                <DataTable visitors={visitors.slice(0, 10)} />
              ) : (
                <p>No visitor data available</p>
              )}
            </CardContent>
          </Card>
        </Section>
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visitors.slice(0, 6).map((visitor) => (
              <ClientCard key={visitor.id} visitor={visitor} />
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
