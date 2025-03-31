import React from "react";
import StatsCard from "../stats-card";
import { User, Users } from "lucide-react";

interface SummaryProps {
  summary: {
    totalVisits: number;
    uniqueVisitors: number;
  };
}

export default function Summary({ summary }: SummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <StatsCard
        title="Total Visits"
        value={summary.totalVisits}
        icon={<Users />}
      />
      <StatsCard
        title="Unique Visitors"
        value={summary.uniqueVisitors}
        icon={<User />}
      />
    </div>
  );
}
