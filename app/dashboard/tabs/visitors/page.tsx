import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { visitorsColumns } from "../../config/table-columns";
import { IVisitorData } from "@/app/types";

export default function Visitors({ visitors }: { visitors: IVisitorData[] }) {
  return <DataTable columns={visitorsColumns} data={visitors} />;
}
