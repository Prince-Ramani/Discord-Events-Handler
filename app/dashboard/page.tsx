import Bar from "@/app/dashboard/_components/bar";
import DashboardContent from "./_components/DashboardContent";
import { CreateEventCategoryModal } from "@/components/create-category-modal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { createCheckoutSession } from "@/lib/stripe";
import { PaymentSuccessModal } from "@/components/PremiumPurchasedModal";

const Page = async ({ searchParams }: any) => {
  const params = await searchParams;

  const auth = await currentUser();
  if (!auth) {
    redirect("/sign-in");
  }
  const user = await prisma.user.findFirst({
    where: {
      externalId: auth.id,
    },
  });
  if (!user) {
    redirect("/welcome");
  }

  if (params.intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user?.email,
      userId: user?.id,
    });

    if (session.url) redirect(session.url);
  }

  const success = params.success;

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}
      <div className=" min-h-full  flex flex-col  overflow-y-scroll no-scrollbar  ">
        <Bar
          title="Dashboard"
          backButton={true}
          backButtonUrl="/"
          cta={
            <CreateEventCategoryModal>
              <Button className="w-full sm:w-fit">
                <PlusIcon className="size-4 mr-2" />
                Add Category
              </Button>
            </CreateEventCategoryModal>
          }
        />
        <div className="flex flex-1  ">
          <DashboardContent />
        </div>
      </div>
    </>
  );
};

export default Page;
