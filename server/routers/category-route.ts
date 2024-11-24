import { prisma } from "@/app/prisma";

import { privateProcedure, router } from "../trpc";
import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { promise, z } from "zod";
import { CATEGORY_NAME_VALIDATOR } from "@/components/validators/category_name_validator";
import { colorParser } from "@/lib/color";
import { TRPCError } from "@trpc/server";
import { FREE_QUOTA, PREMIUM_QUOTA } from "@/config";
export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const firstDayOfMonth = startOfMonth(now);

    if (!ctx.user) {
      throw new TRPCError({
        message: "User not authenticated",
        code: "UNAUTHORIZED",
      });
    }

    const categories = await prisma.eventCategory.findMany({
      where: {
        userId: ctx.user.id,
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
      const { user } = ctx;
      if (!user) {
        throw new TRPCError({
          message: "User not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      const totalCategories = await prisma.eventCategory.findMany({
        where: {
          userId: user.id,
        },
      });

      const limit =
        user.plan === "FREE"
          ? FREE_QUOTA.maxEventCategories
          : PREMIUM_QUOTA.maxEventCategories;

      if (totalCategories.length >= limit) {
        return {
          message:
            "Max limit reached please upgrade to PREMIUM to create more categories!",
        };
      }
      const category = await prisma.eventCategory.create({
        data: {
          name: input.name.toLowerCase(),
          color: colorParser(input.color),
          emoji: input.emoji,
          userId: user.id,
        },
      });
      return category;
    }),

  deleteCategory: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({
          message: "User not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      await prisma.eventCategory.delete({
        where: {
          userId_name: {
            userId: ctx.user.id,
            name: input.name,
          },
        },
      });

      return { success: true };
    }),

  quickStartCategories: privateProcedure.mutation(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({
        message: "User not authenticated",
        code: "UNAUTHORIZED",
      });
    }

    const user = ctx.user;

    await prisma.eventCategory.createMany({
      data: [
        { name: "bug", emoji: "🐛", color: 0xff6b6b },
        { name: "sale", emoji: "💰", color: 0xffeb3b },
        { name: "question", emoji: "🤔", color: 0x6c5ce7 },
      ].map((category) => ({
        ...category,
        userId: user.id,
      })),
    });
    return { success: true };
  }),

  pollCategory: privateProcedure
    .input(z.object({ name: CATEGORY_NAME_VALIDATOR }))
    .query(async ({ ctx, input }) => {
      const { name } = input;

      if (!ctx.user) {
        throw new TRPCError({
          message: "User not authenticated",
          code: "UNAUTHORIZED",
        });
      }
      const category = await prisma.eventCategory.findUnique({
        where: {
          userId_name: {
            userId: ctx.user?.id,
            name: name,
          },
        },
        include: {
          _count: {
            select: {
              events: true,
            },
          },
        },
      });

      if (!category) {
        throw new TRPCError({
          message: `Category ${name} not found`,
          code: "NOT_FOUND",
        });
      }
      const hasEvents = category._count.events > 0;

      return { hasEvents: hasEvents };
    }),

  getCategoryByName: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        page: z.number(),
        limit: z.number().max(50),
        time: z.enum(["today", "week", "month"]),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, name, page, time } = input;
      if (!ctx.user) {
        throw new TRPCError({
          message: "User not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      const now = new Date();

      let startingDate: Date;

      switch (time) {
        case "today":
          startingDate = startOfDay(now);
          break;
        case "week":
          startingDate = startOfWeek(now, { weekStartsOn: 0 });
          break;
        case "month":
          startingDate = startOfMonth(now);
      }

      const [events, eventsCount, uniqueFieldsCount] = await Promise.all([
        prisma.event.findMany({
          where: {
            EventCategory: { name, userId: ctx.user.id },
            createdAt: { gte: startingDate },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),

        prisma.event.count({
          where: {
            EventCategory: { name, userId: ctx.user.id },
            createdAt: { gte: startingDate },
          },
        }),

        prisma.event
          .findMany({
            where: {
              EventCategory: { name, userId: ctx.user.id },
              createdAt: { gte: startingDate },
            },
            select: {
              fields: true,
            },
            distinct: ["fields"],
          })
          .then((events) => {
            const fieldNames = new Set<string>();
            events.forEach((event) => {
              Object.keys(event.fields as object).forEach((fieldName) => {
                fieldNames.add(fieldName);
              });
            });
            return fieldNames.size;
          }),
      ]);

      return {
        events,
        eventsCount,
        uniqueFieldsCount,
      };
    }),
  //
});
