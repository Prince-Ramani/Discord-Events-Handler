import { initTRPC } from "@trpc/server";
import { userRouter } from "./routers/user-route";
import { categoryRouter } from "./routers/category-route";
import { premiumRouter } from "./routers/premium-route";
import { usageRouter } from "./routers/usage-router";

const t = initTRPC.create();

export const appRouter = t.router({
  user: userRouter,
  category: categoryRouter,
  premium: premiumRouter,
  usageInfo: usageRouter,
});

export type AppRouter = typeof appRouter;
