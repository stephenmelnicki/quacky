import process from "node:process";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { prisma } from "./db.js";
import clientReady from "./events/clientReady.js";
import interactionCreate from "./events/interactionCreate.js";
import "dotenv/config";

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

discordClient.on(Events.ClientReady, clientReady);
discordClient.on(Events.InteractionCreate, interactionCreate);

async function main() {
  await discordClient.login(process.env.DISCORD_TOKEN);
}

main()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
