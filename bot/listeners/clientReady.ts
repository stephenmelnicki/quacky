import type { Client } from 'discord.js'
import { registerCommands } from '../utils/commands'
import { logger } from '../utils/logger'

export default async function clientReady(client: Client<true>): Promise<void> {
  logger.info(`Logged in as ${client.user.tag} (${client.user.id}).`)

  logger.info('Registering commands...')
  await registerCommands(client)
  logger.info('Commands registered.')
}
