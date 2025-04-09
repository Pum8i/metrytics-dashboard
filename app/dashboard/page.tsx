import NavBar from "@/app/dashboard/components/nav";
import { getEvents, getRecentVisitors, getVisitorAggregates } from "@/lib/db";
import { IAllEventData, IVisitorAggregatesData, IVisitorData } from "../types";
import TabsDashboard from "./components/tabs";

const defaultVisitorAggregates: IVisitorAggregatesData = {
  pageViews: 0,
  uniqueVisitors: 0,
  referrers: [],
  pages: [],
  countries: [],
  cities: [],
};
const defaultEventsData: IAllEventData = { allEvents: [], totalEvents: 0 };
const defaultRecentVisitors: IVisitorData[] = [];

export default async function Dashboard() {
  let visitorAggregates: IVisitorAggregatesData = defaultVisitorAggregates;
  let eventsData: IAllEventData = defaultEventsData;
  let recentVisitors: IVisitorData[] = defaultRecentVisitors;

  const results = await Promise.allSettled([
    getVisitorAggregates(),
    getEvents(),
    getRecentVisitors(50),
  ]);

  const aggregatesResult = results[0];
  const eventsResult = results[1];
  const recentVisitorsResult = results[2];

  if (aggregatesResult.status === "fulfilled" && aggregatesResult.value) {
    visitorAggregates = aggregatesResult.value;
  } else if (aggregatesResult.status === "rejected") {
    console.error(
      "Dashboard: Failed to fetch visitor aggregates -",
      aggregatesResult.reason
    );
  }

  if (eventsResult.status === "fulfilled" && eventsResult.value) {
    eventsData = eventsResult.value;
  } else if (eventsResult.status === "rejected") {
    console.error(
      "Dashboard: Failed to fetch events data -",
      eventsResult.reason
    );
  }

  if (
    recentVisitorsResult.status === "fulfilled" &&
    recentVisitorsResult.value
  ) {
    recentVisitors = recentVisitorsResult.value;
  } else if (recentVisitorsResult.status === "rejected") {
    console.error(
      "Dashboard: Failed to fetch recent visitors -",
      recentVisitorsResult.reason
    );
  }

  return (
    <main className="max-sm:min-h-screen md:h-screen md:max-h-screen">
      <NavBar />
      <div className="container mx-auto px-2 pb-2 pt-16 h-dvh relative">
        <TabsDashboard
          visitors={recentVisitors}
          visitorAggregates={visitorAggregates}
          events={eventsData}
        />
      </div>
    </main>
  );
}
