import type { Interaction } from 'discord.js'
import type { HandlerFunction } from '../types'
import { getCommands } from '../utils/commands'
import { logger } from '../utils/logger'

const commandsMap = new Map<string, HandlerFunction>();

(async () => {
  const commands = await getCommands()

  for (const command of commands) {
    commandsMap.set(command.data.name, command.handle)
  }
})()

export default async function interactionCreate(interaction: Interaction): Promise<void> {
  if (!interaction.isChatInputCommand()) {
    return
  }

  const handler = commandsMap.get(interaction.commandName)
  if (!handler) {
    logger.error(`No command found for interaction: ${interaction.commandName}`)
    return
  }

  try {
    await handler(interaction)
  }
  catch (err) {
    logger.error(`Error executing command ${interaction.commandName}: ${err}`)
  }
}
