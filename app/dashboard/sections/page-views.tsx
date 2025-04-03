import { IAnalyticsSummary } from "@/app/types";
import Tops from "@/app/dashboard/sections/tops";
import React from "react";

export default function PageViews({ summary }: { summary: IAnalyticsSummary }) {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4 h-fill">
      <div className="flex flex-col md:w-[75%] h-fill gap-4">
        <Tops title="Top Referrers" tops={summary.topReferrers} />
        <Tops title="Top Pages" tops={summary.topPages} />
      </div>
      <div className="flex flex-col md:w-[25%] gap-4">
        <Tops title="Top Countries" tops={summary.countries} />
        <Tops title="Top Cities" tops={summary.cities} />
      </div>
    </div>
  );
}
