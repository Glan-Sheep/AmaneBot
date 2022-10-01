import check from "./scripts/check-config.ts";
import { startBot } from "./deps.ts";
import { Bot } from "./bot.ts"


const checkConfig: boolean = await check();

if (checkConfig) {
  await startBot(Bot);
}