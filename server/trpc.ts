import { Context } from "@/server/Context";
import { initTRPC } from "@trpc/server";
import { authenticate } from "./Middleware/auth-middleware";

const trpc = initTRPC.context<Context>().create();

export const router = trpc.router;
export const procedure = trpc.procedure;
export const privateProcedure = procedure.use(authenticate);
