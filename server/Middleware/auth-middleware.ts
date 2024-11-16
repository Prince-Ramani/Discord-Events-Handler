import { TRPCError } from "@trpc/server";
import { Context } from "../Context";
import { prisma } from "@/app/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const authenticate = async ({
  ctx,
  next,
}: {
  ctx: Context;
  next: any;
}) => {
  if (!ctx.authHeader) {
    throw new TRPCError({
      message: "Authorization header is missing or invalid",
      code: "UNAUTHORIZED",
    });
  }

  const apiKey = ctx.authHeader.split(" ")[1];

  const user = await prisma.user.findUnique({
    where: {
      apiKey,
    },
  });

  if (user) {
    return next({
      ctx: {
        ...ctx,
        user,
      },
    });
  }

  const auth = await currentUser();

  if (!auth)
    throw new TRPCError({
      message: "Authorization header is missing or invalid",
      code: "UNAUTHORIZED",
    });

  const authUser = await prisma.user.findFirst({
    where: {
      externalId: auth.id,
    },
  });

  if (!authUser) {
    throw new TRPCError({
      message: "Authorization header is missing or invalid",
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: authUser,
    },
  });
};
