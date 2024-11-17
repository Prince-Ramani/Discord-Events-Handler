import { User } from "@prisma/client";

export type ContextProps = {
  req: Request;
  user: User | null;
};

export const createContext = ({ req }: { req: Request }): ContextProps => {
  let user: User | null = null;
  return {
    req,
    user,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
