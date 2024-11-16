import { User } from "@prisma/client";

export interface Context {
  authHeader: string | null;
  headers: Headers;
  user?: User | null;
}

export const createContext = ({ req }: { req: Request }) => {
  const headers = req.headers;
  const authHeader = headers.get("Authorization");

  return {
    headers,
    authHeader,
    user: null,
  };
};
