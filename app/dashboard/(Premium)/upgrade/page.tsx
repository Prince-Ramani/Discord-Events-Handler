import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/app/prisma";

import { redirect } from "next/navigation";
import Bar from "../../_components/bar";
import PremiumContent from "./PremiumContent";

const Page = async () => {
  const auth = await currentUser();

  if (!auth) redirect("/sign-in");

  const user = await prisma.user.findFirst({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) redirect("/sign-in");

  return (
    <div>
      <Bar title="Upgrade Plan" backButtonUrl="/dashboard" />
      <PremiumContent plan={user.plan} />
    </div>
  );
};

export default Page;
