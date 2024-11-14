
import { initTRPC } from '@trpc/server';
import { userRouter } from './routers/user-route';  

const t = initTRPC.create();

export const appRouter = t.router({
  userRouter,  
});

export type AppRouter = typeof appRouter;  