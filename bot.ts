import { createBot, Collection, GatewayIntents } from "discordeno/mod.ts";
import {
  BotWithCache,
  enableCachePlugin,
  enableCacheSweepers,
} from "discordeno/plugins/cache/mod.ts";
import {
  BotWithHelpersPlugin,
  enableHelpersPlugin,
} from "discordeno/plugins/helpers/mod.ts";
import { enablePermissionsPlugin } from "discordeno/plugins/permissions/mod.ts";
import { config } from "dotenv";
import { Command } from "./lib/mod.ts";

const env = config();

const bot = createBot({
  token: env["TOKEN"],
  intents: GatewayIntents.Guilds | GatewayIntents.GuildMessages,
  events: {},
});

// Enable All Plugins
enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);

export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
  commands: Collection<string, Command>;
}

export const Amane = bot as BotClient;

Amane.commands = new Collection();
