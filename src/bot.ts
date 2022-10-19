import {
  BotWithCache,
  BotWithHelpersPlugin,
  Collection,
  createBot,
  enableCachePlugin,
  enableHelpersPlugin,
  enablePermissionsPlugin,
  GatewayIntents,
  config,
  enableCacheSweepers,
ApplicationCommandOption,
} from "./deps.ts";

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
  commands: Collection<string, {
    name: string,
    description: string,
    options: ApplicationCommandOption[],
  }>;
  commandsPath: Collection<string, {
    path: string
  }>;
}

export const Amane = bot as BotClient;

Amane.commands = new Collection();
