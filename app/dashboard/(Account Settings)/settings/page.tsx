import { currentUser } from "@clerk/nextjs/server";
import Bar from "../../_components/bar";
import { redirect } from "next/navigation";
import { prisma } from "@/app/prisma";
import SettingsContent from "./SettingsContent";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

      <div className="bg-white rounded-md m-8 lg:m-10 max-w-3xl p-3 px-4  flex justify-between items-center">
        <div className="flex gap-2 font-medium">
          <ArrowRight />
          Sign out
        </div>
        <SignOutButton>
          <Button variant="destructive" size="lg">
            Sign out
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
};

export default Settings;
