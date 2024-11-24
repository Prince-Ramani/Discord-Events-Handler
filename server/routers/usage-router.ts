import { TRPCError } from "@trpc/server";
import { privateProcedure, router } from "../trpc";
import { prisma } from "@/app/prisma";
import { addMonths, startOfMonth } from "date-fns";
import { FREE_QUOTA, PREMIUM_QUOTA } from "@/config";
import { z } from "zod";

export const usageRouter = router({
  getUsageInfo: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;

    if (!user) {
      throw new TRPCError({
        message: "User not authenticated",
        code: "UNAUTHORIZED",
      });
    }

    const currentDate = startOfMonth(new Date());

    const quota = await prisma.quota.findFirst({
      where: {
        userId: user.id,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      },
    });

    const eventCount = quota?.count ?? 0;

    const categoryCount = await prisma.eventCategory.count({
      where: { userId: user.id },
    });

    const limits = user.plan === "PAID" ? PREMIUM_QUOTA : FREE_QUOTA;

    const resetDate = addMonths(currentDate, 1);

    return {
      categoriesUsed: categoryCount,
      categoriesLimit: limits.maxEventCategories,
      eventsUsed: eventCount,
      eventsLimit: limits.maxEvents,
      resetDate,
    };
  }),

  setDiscordId: privateProcedure
    .input(z.object({ discordId: z.string().max(20) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      if (!user) {
        throw new TRPCError({
          message: "User not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          discordId: input.discordId,
        },
      });
      return { success: true };
    }),
});
