import type { Client } from "discord.js";
import { registerCommands } from "../utils/commands.js";
import { logger } from "../utils/logger.js";

export default async function clientReady(client: Client<true>): Promise<void> {
  logger.info(`Logged in as ${client.user.tag} (${client.user.id}).`);

  await registerCommands(client);
}
