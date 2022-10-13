import { Amane } from "../bot.ts";
import { InteractionTypes, Integration } from "../deps.ts";
import log from "../utils/logger.ts";

Amane.events.integrationCreate = (_, interaction) => {
  if (!interaction) return

  switch (interaction.type) {
    case InteractionTypes.ApplicationCommand:
      log.info(`[Application Command] ${interaction.name} command`)
      Amane.commands.get(interaction.name!)?.execute(Amane, interaction)
  }
}