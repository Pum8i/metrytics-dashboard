import { IEventData } from "@/app/types";
import { DataTable } from "@/components/ui/data-table";
import { eventColumns } from "../../config/table-columns";

export default function Events({ events }: { events: IEventData[] }) {
  return <DataTable columns={eventColumns} data={events} />;
}
