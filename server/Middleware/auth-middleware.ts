import { TRPCError } from "@trpc/server";
import { prisma } from "@/app/prisma";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { Context, ContextProps } from "../context";

export const authenticate = async ({
  ctx,
  next,
}: {
  ctx: ContextProps;
  next: any;
}) => {
  const auth = await currentUser();

  if (!auth) {
    throw new TRPCError({
      message: "Authorization header is missing or invalid",
      code: "UNAUTHORIZED",
    });
  }

  const authUser = await prisma.user.findUnique({
    where: {
      externalId: auth.id,
    },
  });

  if (!authUser) {
    throw new TRPCError({
      message: "User not found",
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
