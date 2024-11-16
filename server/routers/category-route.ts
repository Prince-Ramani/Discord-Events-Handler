import { prisma } from "@/app/prisma";
import { trpc } from "../client";
import { privateProcedure, router } from "../trpc";
import { set, startOfMonth } from "date-fns";

export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const firstDayOfMonth = startOfMonth(now);

    const categories = await prisma.eventCategory.findMany({
      where: {
        userId: ctx.user?.id,
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        color: true,
        updatedAt: true,
        createdAt: true,
        events: {
          where: {
            createdAt: { gte: firstDayOfMonth },
          },
        },
        _count: {
          select: {
            events: {
              where: {
                createdAt: { gte: firstDayOfMonth },
              },
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    const categoriesWithCount = categories.map((category) => {
      const uniqueNames = new Set<string>();
      let lastPing: Date | null = null;

      category.events.forEach((e) => {
        Object.keys(e.fields as Object).forEach((fieldName) => {
          uniqueNames.add(fieldName);
        });
        if (!lastPing || e.createdAt > lastPing) {
          lastPing = e.createdAt;
        }
      });
      return {
        id: category.id,
        name: category.name,
        emoji: category.emoji,
        color: category.color,
        updatedAt: category.updatedAt,
        createdAt: category.createdAt,
        uniqueFieldCount: uniqueNames.size,
        eventsCount: category._count.events,
        lastPing,
      };
    });
    return { categoriesWithCount };
  }),
});
