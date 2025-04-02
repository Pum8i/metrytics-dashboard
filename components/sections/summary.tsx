import React from "react";
import StatsCard from "../stats-card";
import { Activity, User, Users } from "lucide-react";

interface SummaryProps {
  summary: {
    totalVisitors: number;
    uniqueVisitors: number;
    totalEvents: number;
  };
}

export default function Summary({ summary }: SummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
      <StatsCard
        title="Total Visitors"
        value={summary.totalVisitors}
        icon={<Users />}
      />
      <StatsCard
        title="Unique Visitors"
        value={summary.uniqueVisitors}
        icon={<User />}
      />
      <StatsCard
        title="Total Events"
        value={summary.totalEvents}
        icon={<Activity />}
      />
    </div>
  );
}
