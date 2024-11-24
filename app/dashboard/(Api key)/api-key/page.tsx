import { redirect } from "next/navigation";
import Bar from "../../_components/bar";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/app/prisma";
import ApiKeyContent from "./ApiKeyContent";

const ApiKey = async () => {
  const auth = await currentUser();

  if (!auth) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <Bar title="API KEY" />
      <ApiKeyContent apiKey={user.apiKey ?? ""} />
    </div>
  );
};

export default ApiKey;
