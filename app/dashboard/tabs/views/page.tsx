import { IAnalyticsSummary } from "@/app/types";
import React from "react";
import TopChart from "./top-chart";
import Tops from "./tops";

export default function PageViews({ summary }: { summary: IAnalyticsSummary }) {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4 h-full ">
      <div className="flex flex-col md:w-2/3 gap-4">
        <Tops title="Top Referrers" tops={summary.topReferrers} />
        <Tops title="Top Pages" tops={summary.topPages} />
      </div>
      <div className="flex flex-col md:w-1/3 h-full gap-4">
        <TopChart data={summary.countries.slice(0, 5)} label="Countries" />
        <TopChart data={summary.cities.slice(0, 5)} label="Cities" />
        {/* <Tops title="Top Countries" tops={summary.countries} /> */}
        {/* <Tops title="Top Cities" tops={summary.cities} /> */}
      </div>
    </div>
  );
}
