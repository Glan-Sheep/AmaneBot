import { Amane } from "../bot.ts";
import { InteractionTypes } from "../deps.ts";
import log from "../utils/logger.ts";

Amane.events.interactionCreate = (_, interaction) => {
  log.info(interaction);
  if (!interaction.data) return

  switch (interaction.type) {
    case InteractionTypes.ApplicationCommand:
      log.info(`[Application Command] ${interaction.data.name} command`)
      Amane.commands.get(interaction.data?.name!)?.execute(Amane, interaction)
  }

  log.info(interaction)
}