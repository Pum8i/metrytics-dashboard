"use client";

import { IEventData, IVisitorData } from "@/app/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

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
    </Button>
  );
}

const formatTime = <T extends IVisitorData | IEventData>({
  row,
}: {
  row: Row<T>;
}) => {
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
    accessorKey: "referrer",
    header: "Referrer",
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: formatTime,
  },
];
