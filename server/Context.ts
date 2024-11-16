export const createContext = ({ req }: { req: Request }) => {
  const headers = req.headers;
  const authorization =
    headers.get("authorization") || headers.get("Authorization");

  console.log("Authorization Header:", authorization);

  return {
    headers,
    authorization,
  };
};

// Use Awaited<ReturnType> to infer the context type
export type Context = Awaited<ReturnType<typeof createContext>>;
