import { PrismaClient } from "@prisma/client";

import { env } from "~/env";
import { seedIfNeeded } from "./seedIfNeeded";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

if (env.NODE_ENV !== "production") {
  // Seed the database if needed on server start
  seedIfNeeded(db).catch((err) => console.error("Seeding error:", err));
}
