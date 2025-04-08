"use client";

import NavBar from "@/app/dashboard/nav";
import { IAnalyticsSummary, IEventData, IVisitorData } from "@/app/types";
import { useActionState, useEffect, useState } from "react";
import { logout } from "../../lib/actions";
import TabsDashboard from "./tabs/page";

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
        pageViews,
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
        pageViews,
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
    <main className="max-sm:min-h-screen md:h-screen md:max-h-screen">
      <NavBar
        formAction={formAction}
        isPending={isPending}
        fetchData={fetchData}
        loading={loading}
      />
      <div className="container mx-auto px-2 pb-2 pt-16 h-dvh relative">
        {loading && (
          <div className="flex h-full w-full z-50 items-center justify-center absolute inset-0 bg-background/50">
            <div className="text-2xl font-semibold">Refreshing data...</div>
          </div>
        )}
        {summary && (
          <TabsDashboard
            visitors={visitors}
            events={events}
            summary={summary}
          />
        )}
      </div>
    </main>
  );
}
