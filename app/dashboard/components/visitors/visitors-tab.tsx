import { IVisitorData } from "@/app/types";
import { DataTable } from "@/components/ui/data-table";
import { visitorsColumns } from "../../config/table-columns";

export default function Visitors({ visitors }: { visitors: IVisitorData[] }) {
  return <DataTable columns={visitorsColumns} data={visitors} />;
}
