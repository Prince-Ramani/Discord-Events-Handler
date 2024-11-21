import { FREE_QUOTA, PREMIUM_QUOTA } from "@/config";
import { prisma } from "@/app/prisma";
import { DiscordClient } from "@/lib/DiscordClient";
import { CATEGORY_NAME_VALIDATOR } from "@/components/validators/category_name_validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const REQUEST_VALIDATOR = z
  .object({
    category: CATEGORY_NAME_VALIDATOR,
    fields: z.record(z.string().or(z.number()).or(z.boolean())).optional(),
    description: z.string().optional(),
  })
  .strict();

export const POST = async (req: NextRequest) => {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          message: "Invalid auth header format. Expected: 'Bearer [API_KEY]'",
        },
        { status: 401 }
      );
    }

    const apiKey = authHeader.split(" ")[1];

    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json({ message: "Invalid API key" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { apiKey },
      include: { EventCategory: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid API key" }, { status: 401 });
    }

    if (!user.discordId) {
      return NextResponse.json(
        {
          message: "Please enter your discord ID in your account settings",
        },
        { status: 403 }
      );
    }

    const currentData = new Date();
    const currentMonth = currentData.getMonth() + 1;
    const currentYear = currentData.getFullYear();

    const quota = await prisma.quota.findFirst({
      where: {
        userId: user.id,
        month: currentMonth,
        year: currentYear,
      },
    });

    const quotaLimit =
      user.plan === "FREE" ? FREE_QUOTA.maxEvents : PREMIUM_QUOTA.maxEvents;

    if (quota && quota.count >= quotaLimit) {
      return NextResponse.json(
        {
          message:
            "Monthly quota reached. Please upgrade your plan for more events",
        },
        { status: 429 }
      );
    }

    const discord = new DiscordClient(process.env.DISCORD_BOT_TOKEN);

    const dmChannel = await discord.createDM(user.discordId);

    let requestData: unknown;

    try {
      requestData = await req.json();
    } catch (err) {
      return NextResponse.json(
        {
          message: "Invalid JSON request body",
        },
        { status: 400 }
      );
    }

    const validationResult = REQUEST_VALIDATOR.parse(requestData);

    const category = user.EventCategory.find(
      (cat) => cat.name === validationResult.category
    );

    if (!category) {
      return NextResponse.json(
        {
          message: `You dont have a category named "${validationResult.category}"`,
        },
        { status: 404 }
      );
    }

    const eventData = {
      title: `${category.emoji || "🔔"} ${
        category.name.charAt(0).toUpperCase() + category.name.slice(1)
      }`,
      description:
        validationResult.description ||
        `A new ${category.name} event has occurred!`,
      color: category.color,
      timestamp: new Date().toISOString(),
      fields: Object.entries(validationResult.fields || {}).map(
        ([key, value]) => {
          return {
            name: key,
            value: String(value),
            inline: true,
          };
        }
      ),
    };

    const event = await prisma.event.create({
      data: {
        name: category.name,
        formatedMessage: `${eventData.title}\n\n${eventData.description}`,
        userId: user.id,
        fields: validationResult.fields || {},
        eventCategoryId: category.id,
      },
    });

    try {
      await discord.sendEmbed(dmChannel.id, eventData);

      await prisma.event.update({
        where: { id: event.id },
        data: { deliveryStatus: "DELIVERED" },
      });

      await prisma.quota.upsert({
        where: { userId: user.id, year: currentYear, month: currentMonth },
        update: { count: { increment: 1 } },
        create: {
          userId: user.id,
          month: currentMonth,
          year: currentYear,
          count: 1,
        },
      });
    } catch (err) {
      await prisma.event.update({
        where: { id: event.id },
        data: { deliveryStatus: "FAILED" },
      });

      console.log(err);

      return NextResponse.json(
        {
          message: "Error processing event",
          eventId: event.id,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Event processed successfully",
      eventId: event.id,
    });
  } catch (err) {
    console.error(err);

    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.message }, { status: 422 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
