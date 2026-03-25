import type {
  ChatInputCommandInteraction,
  Client,
  SlashCommandBuilder,
} from "discord.js";
import { readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { logger } from "../utils/logger.js";

export type HandlerFunction = (
  interaction: ChatInputCommandInteraction,
) => Promise<void>;

export interface Command {
  data: SlashCommandBuilder;
  handle: HandlerFunction;
}

export async function getCommands(): Promise<Command[]> {
  const commands: Command[] = [];

  return (async () => {
    if (commands.length > 0) {
      return commands;
    }

    const commandsPath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "commands",
    );
    const commandFiles = readdirSync(commandsPath).filter((file) =>
      file.endsWith(".js"),
    );

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = (await import(filePath)) as Command;
      commands.push(command);
    }

    return commands;
  })();
}

export async function registerCommands(client: Client<true>): Promise<void> {
  const commands = await getCommands();
  logger.info(`Registering ${commands.length} commands...`);

  if (process.env.GUILD_ID) {
    // register commands to guild for faster updates during development
    await client.application.commands.set(
      commands.map((command) => command.data.toJSON()),
      process.env.GUILD_ID,
    );
    logger.info(`Commands registered to Guild ${process.env.GUILD_ID}.`);
  } else {
    // NOTE: Global commands can take a while to register. Not recommended for development.
    // await client.application.commands.set(commands.map(command => command.data.toJSON()))
    logger.warn(
      "Commands not registered. Global command registration is disabled at this time. Provide a value to the GUILD_ID environment variable.",
    );
  }
}
