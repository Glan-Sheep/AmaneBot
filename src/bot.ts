import {
  config,
} from "./deps.ts";
import {
  BotWithCache,
  BotWithHelpersPlugin,
  enableCachePlugin,
  enableCacheSweepers,
  enableHelpersPlugin,
  enablePermissionsPlugin,
} from "https://deno.land/x/discordeno@16.0.1/plugins/mod.ts";
import { SlashCommand } from "./types/SlashCommands.ts"

const env = config();
console.log(env)
const bot = createBot({
  token: env["TOKEN"],
  botId: 933692030134157322n,
  intents: GatewayIntents.Guilds,
  events: {},
});

enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);

export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
  commands: Collection<string, SlashCommand>;
}

export const Bot = bot as BotClient;

Bot.commands = new Collection();