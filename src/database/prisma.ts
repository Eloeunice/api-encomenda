import { PrismaClient } from "../generated/prisma/client.js";

export const prisa = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});