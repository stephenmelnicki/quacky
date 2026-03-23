import type { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

export type HandlerFunction = (interaction: ChatInputCommandInteraction) => Promise<void>

export interface Command {
  data: SlashCommandBuilder
  handle: HandlerFunction
}

export async function getCommands(): Promise<Command[]> {
  const commands: Command[] = []

  return (async () => {
    if (commands.length > 0) {
      return commands
    }

    const commandsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'commands')
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file)
      const command = await import(filePath) as Command
      commands.push(command)
    }

    return commands
  })()
}

export async function registerCommands(client: Client<true>): Promise<void> {
  const commands = await getCommands()
  await client.application.commands.set(commands.map(command => command.data.toJSON()), process.env.GUILD_ID!)
}
