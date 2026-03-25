import process from "node:process";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";
import Queue from "queue";
import type { QueueWorkerCallback } from "queue";
import "dotenv/config";

export interface UsagePayload {
  guildId: string;
  channelId: string;
  userId: string;
  username: string;
  discriminator: string;
}

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });

const databaseQueue = new Queue({
  concurrency: 1,
  autostart: true,
});

export function addUsage(usage: UsagePayload) {
  databaseQueue.push((callback) => processUsage(usage, callback));
}

async function processUsage(
  usage: UsagePayload,
  callback?: QueueWorkerCallback,
) {
  await prisma.usage.upsert({
    where: {
      guildId_channelId_userId: {
        guildId: BigInt(usage.guildId),
        channelId: BigInt(usage.channelId),
        userId: BigInt(usage.userId),
      },
    },
    create: {
      guildId: BigInt(usage.guildId),
      channelId: BigInt(usage.channelId),
      user: {
        connectOrCreate: {
          where: {
            id: BigInt(usage.userId),
          },
          create: {
            id: BigInt(usage.userId),
            username: usage.username,
            discriminator: usage.discriminator,
            lastUpdate: BigInt(Date.now()),
          },
        },
      },
      counter: 1,
    },
    update: {
      counter: {
        increment: 1,
      },
    },
  });

  callback?.();
}
