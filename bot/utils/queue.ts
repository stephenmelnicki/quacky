import type { QueueWorkerCallback } from 'queue'
import Queue from 'queue'
import { prisma } from './prisma'

const databaseQueue = new Queue({
  concurrency: 1,
  autostart: true,
})

export interface UsageQueueItem {
  guildId: string
  channelId: string
  userId: string
  username: string
  discriminator: string
}

async function processUsageQueueItem(item: UsageQueueItem, callback?: QueueWorkerCallback) {
  await prisma.usage.upsert({
    where: {
      guildId_channelId_userId: {
        guildId: BigInt(item.guildId),
        channelId: BigInt(item.channelId),
        userId: BigInt(item.userId),
      },
    },
    create: {
      guildId: BigInt(item.guildId),
      channelId: BigInt(item.channelId),
      user: {
        connectOrCreate: {
          where: {
            id: BigInt(item.userId),
          },
          create: {
            id: BigInt(item.userId),
            username: item.username,
            discriminator: item.discriminator,
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
  })

  callback?.()
}

export function addToUsageQueue(item: UsageQueueItem) {
  databaseQueue.push(callback => processUsageQueueItem(item, callback))
}
