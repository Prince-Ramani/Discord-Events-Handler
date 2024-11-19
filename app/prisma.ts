import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (globalThis.prisma) {
    prisma = globalThis.prisma;
  } else {
    prisma = new PrismaClient();
    globalThis.prisma = prisma;
  }
}

export { prisma };
