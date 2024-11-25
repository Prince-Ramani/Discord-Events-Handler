import { currentUser } from "@clerk/nextjs/server";
import { procedure, router } from "../trpc";
import { prisma } from "@/app/prisma";

export const userRouter = router({
  getUserSyncStatus: procedure.query(async () => {
    const auth = await currentUser();
    console.log(currentUser);
    if (!auth) {
      return { isSynced: false };
    }
    try {
      const existsInDatabase = await prisma.user.findFirst({
        where: {
          externalId: auth.id,
        },
      });

      if (!existsInDatabase) {
        await prisma.user.create({
          data: {
            quotaLimit: 100,
            externalId: auth.id,
            email: auth.emailAddresses[0].emailAddress,
          },
        });
      }

      return { isSynced: true };
    } catch (error) {
      console.error("Error syncing user ", error);
      return { isSynced: false };
    }
  }),
});
