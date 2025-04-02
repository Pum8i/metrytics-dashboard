"use client";

import { IAnalyticsSummary, IEventData, IVisitorData } from "@/app/types";
import ClientCard from "@/components/client-card";
import EventsTable from "@/components/events-table";
import NavBar from "@/components/nav";
import Summary from "@/components/sections/summary";
import Tops from "@/components/sections/tops";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VisitorsTable from "@/components/visitors-table";
import { useActionState, useEffect, useState } from "react";
import { logout } from "../lib/actions";

export default function Dashboard() {
  const [visitors, setVisitors] = useState<IVisitorData[]>([]);
  const [events, setEvents] = useState<IEventData[]>([]);

  const [summary, setSummary] = useState<IAnalyticsSummary | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [, formAction, isPending] = useActionState(logout, undefined);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [visitorsRes, eventsRes] = await Promise.all([
        fetch("/api/analytics/visitors"),
        fetch("/api/analytics/events"),
      ]);

      if (!visitorsRes.ok || !eventsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [visitorsData, eventsData] = await Promise.all([
        visitorsRes.json(),
        eventsRes.json(),
      ]);

      const {
        visitors,
        totalVisitors,
        uniqueVisitors,
        pages,
        referrers,
        countries,
        cities,
      } = visitorsData;

      const { allEvents, totalEvents } = eventsData;

      setVisitors(visitors);
      setEvents(allEvents);

      setSummary({
        countries,
        cities,
        totalEvents,
        totalVisitors,
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
          <div className="flex h-full w-full z-50 items-center justify-center absolute inset-0 bg-background/50">
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
                <VisitorsTable visitors={visitors.slice(0, 10)} />
              ) : (
                <p>No visitor data available</p>
              )}
            </CardContent>
          </Card>
        </Section>
        <Section>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <EventsTable events={events.slice(0, 10)} />
              ) : (
                <p>No event data available</p>
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
