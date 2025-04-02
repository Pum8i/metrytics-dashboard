import { IEventData } from "@/app/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  events: IEventData[];
}

export default function EventsTable({ events }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">App Name</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.app_name}</TableCell>
              <TableCell className="font-medium">{event.ip_address}</TableCell>
              <TableCell className="font-medium">{event.event}</TableCell>
              <TableCell className="font-medium">{event.description}</TableCell>
              <TableCell className="font-medium">
                {new Date(event.timestamp).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
