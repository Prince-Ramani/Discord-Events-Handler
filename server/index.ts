import { initTRPC } from "@trpc/server";
import { userRouter } from "./routers/user-route";
import { categoryRouter } from "./routers/category-route";

const t = initTRPC.create();

export const appRouter = t.router({
  user: userRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
