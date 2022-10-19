import { Amane } from "../bot.ts";
import log from "../utils/logger.ts";

Amane.events.ready = () => {
  log.info(`[READY]`);
};
