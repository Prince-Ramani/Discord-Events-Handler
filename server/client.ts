// src/server/client.ts
import { createTRPCReact } from "@trpc/react-query"; // Import the tRPC React Query bindings
import { AppRouter } from "./index"; // Import the AppRouter type from your server

// Create the tRPC client with the AppRouter type
export const trpc = createTRPCReact<AppRouter>();
