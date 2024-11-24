import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/app/prisma";

import { redirect } from "next/navigation";
import Bar from "../../_components/bar";
import PremiumContent from "./PremiumContent";
import { createCheckoutSession } from "@/lib/stripe";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const auth = await currentUser();

  if (!auth) redirect("/sign-in");

  const user = await prisma.user.findFirst({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) redirect("/sign-in");

  if (searchParams.intent === "upgrade") {
    await createCheckoutSession({
      userEmail: user?.email,
      userId: user?.id,
    });
  }

  return (
    <div>
      <Bar title="Upgrade Plan" backButtonUrl="/dashboard" />
      <PremiumContent plan={user.plan} />
    </div>
  );
};

export default Page;
