"use client";

import { Event, EventCategory } from "@prisma/client";

import Heading from "@/components/Heading";

import LoadingSpinner from "@/components/LoadindSpinner";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/server/client";
import { Tabs } from "@radix-ui/react-tabs";
import { isAfter, isToday, startOfMonth, startOfWeek } from "date-fns";
import { ArrowUpDown, BarChart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CategoryContentProps {
  hasEvents: boolean;
  categoryName: string;
}

const CategoryContent = ({ hasEvents, categoryName }: CategoryContentProps) => {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "30", 10);

  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">(
    "week"
  );
  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  });

  const { data, isFetching } = trpc.category.getCategoryByName.useQuery(
    {
      name: categoryName,
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      time: activeTab,
    },
    {
      refetchOnWindowFocus: false,
      enabled: hasEvents,
    }
  );

  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", (pagination.pageIndex + 1).toString());
    searchParams.set("limit", pagination.pageSize.toString());
    router.push(`?${searchParams.toString()}`, { scroll: false });
  }, [pagination, router]);

  const columns: ColumnDef<Event>[] = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "Category",
        cell: () => <span>{categoryName || "Uncategorized"}</span>,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Date
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return new Date(row.getValue("createdAt")).toLocaleString();
        },
      },
      ...(data?.events[0]
        ? Object.keys(data.events[0].fields as object).map((field) => ({
            accessorFn: (row: Event) =>
              (row.fields as Record<string, any>)[field],
            header: field,
            cell: ({ row }: { row: Row<Event> }) =>
              (row.original.fields as Record<string, any>)[field] || "-",
          }))
        : []),
      {
        accessorKey: "deliveryStatus",
        header: "Delivery Status",
        cell: ({ row }) => (
          <span
            className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
              "bg-green-100 text-green-800":
                row.getValue("deliveryStatus") === "DELIVERED",
              "bg-red-100 text-red-800":
                row.getValue("deliveryStatus") === "FAILED",
              "bg-yellow-100 text-yellow-800":
                row.getValue("deliveryStatus") === "PENDING",
            })}
          >
            {row.getValue("deliveryStatus")}
          </span>
        ),
      },
    ],

    [categoryName, data?.events]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: data?.events || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.eventsCount || 0) / pagination.pageSize),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  const something = useMemo(() => {
    if (!data?.events || data.events.length === 0) return {};

    let sums: Record<
      string,
      {
        total: number;
        thisWeek: number;
        thisMonth: number;
        today: number;
      }
    > = {};

    const now = new Date();

    const weekStart = startOfWeek(now, { weekStartsOn: 0 });
    const monthStart = startOfMonth(now);

    data.events.forEach((event) => {
      const eventDate = new Date(event.createdAt);

      Object.entries(event.fields as any).forEach(([field, value]) => {
        if (typeof value === "number") {
          if (!sums[field]) {
            sums[field] = { total: 0, thisWeek: 0, thisMonth: 0, today: 0 };
          }

          sums[field].total += value;

          if (
            isAfter(eventDate, weekStart) ||
            eventDate.getTime() === weekStart.getTime()
          ) {
            sums[field].thisWeek += value;
          }

          if (
            isAfter(eventDate, monthStart) ||
            eventDate.getTime() === monthStart.getTime()
          ) {
            sums[field].thisMonth += value;
          }

          if (isToday(eventDate)) {
            sums[field].today += value;
          }
        }
      });
    });

    return sums;
  }, [data?.events]);

  const FieldsSum = () => {
    if (Object.keys(something).length === 0) return null;

    return Object.entries(something).map(([field, sums]) => {
      const sumToShow =
        activeTab === "today"
          ? sums.today
          : activeTab === "week"
          ? sums.thisWeek
          : sums.thisMonth;

      return (
        <div
          className="bg-white rounded-md  p-4 flex flex-col shadow-md  gap-2 min-h-40 justify-center  "
          key={field}
        >
          <div className="flex justify-between  p-2">
            <h1 className="font-semibold text-lg/6">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </h1>
            <BarChart className="size-6" />
          </div>
          <h1 className="font-semibold text-2xl px-2">
            {sumToShow.toFixed(2)}
          </h1>
          <h1 className="text-gray-600 text-sm px-2">
            Events {activeTab !== "today" ? "this" : null} {activeTab}
          </h1>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-1 flex-col min-h-full w-full   justify-start items-center p-5 md:p-10 ">
      <Tabs
        className="h-fit w-full   "
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as "today" | "week" | "month");
        }}
      >
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This week</TabsTrigger>
          <TabsTrigger value="month">This month</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10  w-full  p-1 ">
            <div className="bg-white rounded-md border p-4 flex flex-col shadow-md  gap-2 min-h-40 justify-center  ">
              <div className="flex justify-between  p-2">
                <h1 className="font-semibold text-lg/6">Total events</h1>
                <BarChart className="size-6" />
              </div>
              <h1 className="font-semibold text-2xl px-2">
                {data?.events && !isFetching ? (
                  data?.eventsCount || 0
                ) : (
                  <LoadingSpinner />
                )}
              </h1>
              <h1 className="text-gray-600 text-sm px-2">
                Events {activeTab !== "today" ? "this" : null} {activeTab}
              </h1>
            </div>
            <FieldsSum />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-6   w-full h-fit">
        <div className="flex items-center justify-between">
          <div className="w-full flex flex-col gap-4">
            <Heading className="underline decoration-blue-400 decoration-2 decoration-wavy px-2 ">
              Event overview
            </Heading>
          </div>
        </div>
        <div className="bg-white w-full h-full flex flex-1">
          <Table className=" border">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isFetching ? (
                [...Array(5)].map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || isFetching}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || isFetching}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default CategoryContent;
