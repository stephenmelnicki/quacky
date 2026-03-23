import process from 'node:process'

import { Client, Events, GatewayIntentBits } from 'discord.js'

import clientReady from './listeners/clientReady'
import interactionCreate from './listeners/interactionCreate'
import { logger } from './utils/logger'
import { prisma } from './utils/prisma'

import 'dotenv/config'

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] })

discordClient.on(Events.ClientReady, clientReady)
discordClient.on(Events.InteractionCreate, interactionCreate)

async function main() {
  await discordClient.login(process.env.DISCORD_TOKEN)
}

main()
  .catch((err) => {
    logger.error(err)
    throw err
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
