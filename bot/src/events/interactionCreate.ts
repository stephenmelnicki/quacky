import type { ChatInputCommandInteraction, Interaction } from "discord.js";
import { getCommands } from "../utils/commands.js";
import { logger } from "../utils/logger.js";

type HandlerFunction = (
  interaction: ChatInputCommandInteraction,
) => Promise<void>;

const commandsMap = new Map<string, HandlerFunction>();

const commands = await getCommands();
for (const command of commands) {
  commandsMap.set(command.data.name, command.handle);
}

export default async function interactionCreate(
  interaction: Interaction,
): Promise<void> {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const handler = commandsMap.get(interaction.commandName);
  if (!handler) {
    logger.error(
      `No command found for interaction: ${interaction.commandName}`,
    );
    return;
  }

  try {
    await handler(interaction);
  } catch (err) {
    logger.error(`Error executing command ${interaction.commandName}: ${err}`);
  }
}
