import { IVisitorData } from "@/app/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  visitors: IVisitorData[];
}

export default function DataTable({ visitors }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">App Name</TableHead>
            <TableHead className="">Time</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="">Browser / OS</TableHead>
            <TableHead className="">Page</TableHead>
            <TableHead className="">Referrer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitors.map((visitor) => (
            <TableRow key={visitor.id}>
              <TableCell className="font-medium">{visitor.app_name}</TableCell>
              <TableCell className="font-medium">
                {new Date(visitor.timestamp).toLocaleString()}
              </TableCell>
              <TableCell className="font-medium">
                {visitor.ip_address}
              </TableCell>
              <TableCell className="font-medium">
                {visitor.location ? `${visitor.location}` : "Unknown"}
              </TableCell>
              <TableCell className="font-medium">
                {visitor.browser_os}
              </TableCell>
              <TableCell className="font-medium"> {visitor.page}</TableCell>
              <TableCell className="font-medium"> {visitor.referrer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
