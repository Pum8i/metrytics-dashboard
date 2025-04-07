"use client";

import { IEventData, IVisitorData } from "@/app/types";
import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { ReactNode } from "react";

interface SortableColumnProps {
  column: {
    toggleSorting: (ascending: boolean) => void;
    getIsSorted: () => "asc" | "desc" | false;
  };
  title: string;
}

const formatTime = ({ row }: { row: Row<any> }) => {
  const timeDate = new Date(row.getValue("timestamp"));
  const formattedTime = timeDate.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return <div className="">{formattedTime}</div>;
};

const sortColumn = ({ column, title }: SortableColumnProps): ReactNode => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}

      {column?.getIsSorted() === false ? (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      ) : column?.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-2 h-4 w-4" />
      )}
      {}
    </Button>
  );
};

export const visitorsColumns: ColumnDef<IVisitorData>[] = [
  {
    accessorKey: "app_name",
    header: "App Name",
  },
  {
    accessorKey: "ip_address",
    header: "IP Address",
  },
  {
    accessorKey: "browser",
    header: "Browser",
  },
  {
    accessorKey: "os",
    header: "OS",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => sortColumn({ column, title: "Time" }),
    cell: formatTime,
  },
];

export const eventColumns: ColumnDef<IEventData>[] = [
  {
    accessorKey: "app_name",
    header: "App Name",
  },
  {
    accessorKey: "ip_address",
    header: "IP Address",
  },
  {
    accessorKey: "event",
    header: "Event",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: formatTime,
  },
];
