import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPostgresAdapter } from "@prisma/adapter-ppg";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

const connectionString = process.env.PRISMA_DIRECT_TCP_URL;

if (!connectionString) {
    throw new Error("PRISMA_DIRECT_TCP_URL belum diatur");
}

const adapter = new PrismaPostgresAdapter({
    connectionString,
});

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
