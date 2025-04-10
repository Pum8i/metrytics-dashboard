import { IVisitorAggregatesData } from "@/app/types";
import PieChart from "./pie-chart";
import RawChart from "./raw-chart";

export default function PageViews({
  visitors,
}: {
  visitors: IVisitorAggregatesData;
}) {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4 h-full ">
      <div className="flex flex-col md:w-2/3 gap-4">
        <RawChart title="Top Referrers" data={visitors.referrers} />
        <RawChart title="Top Pages" data={visitors.pages} />
      </div>
      <div className="flex flex-col md:w-1/3 h-full gap-4">
        <PieChart data={visitors.countries.slice(0, 5)} label="Countries" />
        <PieChart data={visitors.cities.slice(0, 5)} label="Cities" />
        {/* <RawChart title="Top Countries" tops={summary.countries} /> */}
        {/* <RawChart title="Top Cities" tops={summary.cities} /> */}
      </div>
    </div>
  );
}
