import { prisma } from "@/app/prisma";

import { privateProcedure, router } from "../trpc";
import { startOfMonth } from "date-fns";
import { z } from "zod";
import { CATEGORY_NAME_VALIDATOR } from "@/components/validators/category_name_validator";
import { color } from "framer-motion";
import { colorParser } from "@/lib/color";
import { TRPCError } from "@trpc/server";
export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const firstDayOfMonth = startOfMonth(now);
    console.log(ctx);

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
    return categoriesWithCount;
  }),

  createCategory: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        color: z
          .string()
          .min(1, "color is required!")
          .regex(/^#[0-9A-F]{6}$/i, "Inalid color format."),
        emoji: z.string().emoji("Invalid emoji").optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({
          message: "User not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      const category = await prisma.eventCategory.create({
        data: {
          name: input.name.toLowerCase(),
          color: colorParser(input.color),
          emoji: input.emoji,
          userId: ctx.user?.id,
        },
      });

      return category;
    }),
});
