import { initTRPC } from "@trpc/server";
import { authenticate } from "./Middleware/auth-middleware";
import { createContext } from "./Context";

const trpc = initTRPC.context<typeof createContext>().create();

export const router = trpc.router;
export const procedure = trpc.procedure;
export const privateProcedure = procedure.use(authenticate);
