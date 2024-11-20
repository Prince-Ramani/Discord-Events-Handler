"use client";

import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  BarChart2Icon,
  Clock,
  Database,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import LoadingSpinner from "@/components/LoadindSpinner";
import { trpc } from "@/server/client";
import { Modal } from "@/components/ui/modal";
import NoCategory from "./No-categories";
import { toast } from "@/hooks/use-toast";

const DashboardContent = () => {
  const utils = trpc.useUtils();

  const router = useRouter();
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const {
    data: categories,
    isLoading,
    isFetching,
  } = trpc.category.getEventCategories.useQuery();

  const { mutate: deleteCategoryMutation, isPending } =
    trpc.category.deleteCategory.useMutation({
      onSuccess: () => {
        utils.category.getEventCategories.invalidate();
        toast({
          description: `${itemToDelete} Category deleted successfully`,
        });
        setItemToDelete(null);
      },
      onError: (error) => {
        toast({
          description: `Failed to delete the category. Please try again`,
        });
        console.log(error);
      },
    });

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-1 min-h-full w-full   justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (categories?.length == 0) return <NoCategory />;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  w-full   p-10  min-h-full">
        {categories?.map((category) => (
          <div
            className="h-fit shadow-sm shadow-gray-300 bg-white rounded-md flex flex-col    p-5  gap-4 "
            key={category.id}
          >
            <div className="flex items-center p-1  gap-2 ">
              <div
                className="rounded-full h-10 w-10"
                style={{
                  backgroundColor: category.color
                    ? `#${category.color.toString(16).padStart(6, "0")}`
                    : "#f3f4f6",
                }}
              />
              {/* Name */}
              <div className="flex flex-col ">
                <h3 className=" text-gray-950 font-medium text-lg/7 tracking-tight  ">
                  {category.emoji || "📂"} {category.name}
                </h3>
                <span className="text-sm/6 font-medium text-gray-600 ">
                  {format(category.createdAt, "MMM d ,yyy")}
                </span>
              </div>
              {/* info */}
            </div>
            <ul className=" flex flex-col  gap-2 p-1 text-gray-600 text-sm/5 ">
              <li className="flex gap-2 items-center">
                <Clock /> <span className="font-medium">Last ping: </span>
                {category.lastPing || "Never"}
              </li>
              <li className="flex gap-2 items-center ">
                <Database />{" "}
                <span className="font-medium">Unique fields: </span>
                {category.uniqueFieldCount}
              </li>
              <li className="flex gap-2 items-center">
                <BarChart2Icon />
                <span className="font-medium"> Events this month:</span>
                {category.eventsCount || 0}
              </li>
            </ul>
            <div className=" flex justify-between">
              <Button
                variant="outline"
                className="font-medium text-sm leading-tight tracking-tight"
                onClick={() =>
                  router.push(`/dashboard/category/${category.name}`)
                }
              >
                View all <ArrowRight />
              </Button>
              <Button
                variant="outline"
                onClick={() => setItemToDelete(`${category.name}`)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        showModal={!!itemToDelete}
        setShowModal={() => setItemToDelete(null)}
        className="max-w-md p-8"
      >
        <div className="pt-2 pb-7">
          <h1 className="font-bold text-xl/7 py-2">Delete Category</h1>
          <div>
            <p className=" text-gray-600">
              Are you sure you want to delete the category "{itemToDelete}"?
              This action cannot be undone.{" "}
            </p>
          </div>
        </div>
        <div className="border border-gray-500/30" />
        <div className="pt-5 flex justify-end gap-7">
          <Button
            variant="outline"
            size="lg"
            className="p-2 px-4 font-medium"
            onClick={() => setItemToDelete(null)}
            aria-label="Cancel "
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="p-2 px-4 font-medium"
            onClick={() =>
              itemToDelete && deleteCategoryMutation({ name: itemToDelete })
            }
            aria-label="Delete category"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DashboardContent;
