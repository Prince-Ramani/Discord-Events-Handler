import Bar from "@/app/dashboard/_components/bar";
import DashboardContent from "./_components/DashboardContent";
import { CreateEventCategoryModal } from "@/components/create-category-modal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-full h-full w-full overflow-y-scroll bg-slate-100">
      <Bar
        title="Dashboard"
        cta=<>
          <CreateEventCategoryModal>
            <Button className="w-full sm:w-fit">
              <PlusIcon className="size-4 mr-2" />
              Add Category
            </Button>
          </CreateEventCategoryModal>
        </>
      />
      <DashboardContent />
    </div>
  );
};

export default Page;
