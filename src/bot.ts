import {
  BotWithCache,
  BotWithHelpersPlugin,
  Collection,
  createBot,
  enableCachePlugin,
  enableCacheSweepers,
  enableHelpersPlugin,
  enablePermissionsPlugin,
  GatewayIntents,
} from "./deps.ts";
import Command from "./base/SlashCommand.ts";
export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
  commands: Collection<string, Command>
}