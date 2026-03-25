import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { addUsage } from "../db.js";

export const data = new SlashCommandBuilder()
  .setName("quack")
  .setDescription("Replies with Quack!");

export async function handle(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  if (interaction.guildId) {
    addUsage({
      guildId: interaction.guildId,
      channelId: interaction.channelId,
      userId: interaction.user.id,
      username: interaction.user.username,
      discriminator: interaction.user.discriminator,
    });

    await interaction.reply("Quack!");
  }
}
