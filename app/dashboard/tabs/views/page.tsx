import { IAnalyticsSummary } from "@/app/types";
import React from "react";
import PieChart from "./pie-chart";
import RawChart from "./raw-chart";

export default function PageViews({ summary }: { summary: IAnalyticsSummary }) {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4 h-full ">
      <div className="flex flex-col md:w-2/3 gap-4">
        <RawChart title="Top Referrers" data={summary.topReferrers} />
        <RawChart title="Top Pages" data={summary.topPages} />
      </div>
      <div className="flex flex-col md:w-1/3 h-full gap-4">
        <PieChart data={summary.countries.slice(0, 5)} label="Countries" />
        <PieChart data={summary.cities.slice(0, 5)} label="Cities" />
        {/* <Tops title="Top Countries" tops={summary.countries} /> */}
        {/* <Tops title="Top Cities" tops={summary.cities} /> */}
      </div>
    </div>
  );
}
