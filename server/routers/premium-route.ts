import { TRPCError } from "@trpc/server";
import { privateProcedure, router } from "../trpc";
import { createCheckoutSession } from "@/lib/stripe";

export const premiumRouter = router({
  createCheckoutSession: privateProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx;

    if (!user) {
      throw new TRPCError({
        message: "User not authenticated",
        code: "UNAUTHORIZED",
      });
    }

    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    });

    return { url: session.url };
  }),

  getPlan: privateProcedure.query(({ ctx }) => {
    const { user } = ctx;

    if (!user) {
      throw new TRPCError({
        message: "User not authenticated",
        code: "UNAUTHORIZED",
      });
    }
    return { plan: user.plan };
  }),
});
