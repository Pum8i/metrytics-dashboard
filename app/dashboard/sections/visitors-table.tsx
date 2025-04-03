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

export default function VisitorsTable({ visitors }: DataTableProps) {
  if (visitors.length === 0) return <p>No visitor data available</p>;
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">App Name</TableHead>
            <TableHead className="">Time</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Country</TableHead>
            <TableHead className="">Browser</TableHead>
            <TableHead className="">OS</TableHead>
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
              <TableCell className="font-medium">{visitor.city}</TableCell>
              <TableCell className="font-medium">{visitor.country}</TableCell>
              <TableCell className="font-medium">{visitor.browser}</TableCell>
              <TableCell className="font-medium">{visitor.os}</TableCell>
              <TableCell className="font-medium"> {visitor.page}</TableCell>
              <TableCell className="font-medium"> {visitor.referrer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
