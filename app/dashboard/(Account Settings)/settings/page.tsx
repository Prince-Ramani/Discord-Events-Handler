import { currentUser } from "@clerk/nextjs/server";
import Bar from "../../_components/bar";
import { redirect } from "next/navigation";
import { prisma } from "@/app/prisma";
import SettingsContent from "../SettingsContent";

const Settings = async () => {
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
      <Bar title="Settings" />
      <SettingsContent discordId={user.discordId ?? ""} />
    </div>
  );
};

export default Settings;
