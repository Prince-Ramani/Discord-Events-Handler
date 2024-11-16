"use client";
import LoadingSpinner from "@/components/LoadindSpinner";
import { trpc } from "@/server/client";
import { UserButton } from "@clerk/nextjs";

const DashboardContent = () => {
  const { data: categories, isLoading } =
    trpc.category.getEventCategories.useQuery();

  if (isLoading) {
    return (
      <div className="flex flex-1 h-full justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (categories?.length == 0)
    return <div className="w-full h-full border ">No categorie</div>;

  return <UserButton />;
};

export default DashboardContent;
