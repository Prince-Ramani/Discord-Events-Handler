import { CreateEventCategoryModal } from "@/components/create-category-modal";
import Heading from "@/components/Heading";
import LoadingSpinner from "@/components/LoadindSpinner";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { trpc } from "@/server/client";
import { PlusIcon } from "lucide-react";

const NoCategory = () => {
  const utils = trpc.useUtils();
  const { mutate: QuickStart, isPending } =
    trpc.category.quickStartCategories.useMutation({
      onSuccess: () => {
        toast({
          description: "Lets's Gooooooooo!",
        });
        utils.category.getEventCategories.invalidate();
      },
    });

  return (
    <div className="flex flex-1 flex-col min-h-full  justify-center items-center ">
      <div className="flex flex-col items-center justify-center  w-full">
        <img
          src="https://res.cloudinary.com/dwxzguawt/image/upload/v1731929549/pngegg_mz8ga6.png"
          alt="logo"
          className="hidden md:block  h-30 w-60 sm:w-90 relative  top-5 sm:top-8 rotate-12 select-none"
        />
        <Heading className="text-purple-500 text-6xl sm:text-8xl">Zeno</Heading>
      </div>
      <div className=" text-2xl sm:text-3xl font-medium font-mono leading-tight tracking-tighter  text-gray-700">
        No Event Categories Yet
      </div>

      <p className="text-sm/6 text-gray-600 max-w-prose mt-2 mb-8">
        Start tracking events by creating your first category.
      </p>
      <div className=" w-full flex justify-center items-center flex-col sm:flex-row gap-10">
        <Button
          variant="outline"
          size="lg"
          className="bg-purple-600/70 text-white px-16 py-3 lg:px-16 lg:py-5 flex justify-between "
          disabled={isPending}
          onClick={() => QuickStart()}
        >
          {isPending ? (
            <LoadingSpinner />
          ) : (
            <>
              <span>🚀</span>
              <span className="font-medium"> Quick Start</span>
            </>
          )}
        </Button>
        <CreateEventCategoryModal>
          <Button
            size="lg"
            className="py-3 lg:py-5 px-16  "
            disabled={isPending}
          >
            <PlusIcon />
            Add Category
          </Button>
        </CreateEventCategoryModal>
      </div>
    </div>
  );
};

export default NoCategory;
