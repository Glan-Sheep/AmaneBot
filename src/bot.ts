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
  config,
  enableCacheSweepers,
} from "./deps.ts"
import { Command } from "./lib/mod.ts";
export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
  commands: Collection<string, Command>
}