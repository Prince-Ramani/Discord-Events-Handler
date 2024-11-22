"use client";

import LoadingSpinner from "@/components/LoadindSpinner";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/server/client";
import { Tabs } from "@radix-ui/react-tabs";
import { isAfter, isToday, startOfMonth, startOfWeek } from "date-fns";
import { BarChart } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

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
    currentPageIndex: page - 1,
    pageLimit: limit,
  });

  const { data, isFetching } = trpc.category.getCategoryByName.useQuery(
    {
      name: categoryName,
      page: pagination.currentPageIndex + 1,
      limit: pagination.pageLimit,
      time: activeTab,
    },
    {
      refetchOnWindowFocus: false,
      enabled: hasEvents,
    }
  );

  const something = useMemo(() => {
    if (!data?.events || data.events.length === 0) return {};

    const sums: Record<
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

      Object.entries(event.fields as object).forEach(([field, value]) => {
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
    console.log("Uooi");

    return Object.entries(something).map(([field, sums]) => {
      const sumToShow =
        activeTab === "today"
          ? sums.today
          : activeTab === "week"
          ? sums.thisWeek
          : sums.thisMonth;

      return (
        <div
          className="bg-white rounded-md border p-4 flex flex-col  gap-2 min-h-40 justify-center  "
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
    <div className="flex flex-1 flex-col min-h-full w-full  border border-blue-700 justify-start items-center p-5 md:p-10 ">
      <Tabs
        className="h-full w-full "
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16  w-full  p-1">
            <div className="bg-white rounded-md border p-4 flex flex-col  gap-2 min-h-40 justify-center  ">
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
              <FieldsSum />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default CategoryContent;
