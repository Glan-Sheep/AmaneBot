import { Amane } from "../bot.ts";
import { InteractionResponseTypes, InteractionTypes } from "../deps.ts";
import log from "../utils/logger.ts";

Amane.events.interactionCreate = (_, interaction) => {
  if (!interaction.data) return;

  switch (interaction.type) {
    case InteractionTypes.ApplicationCommand: {
      log.info(`[Application Command] ${interaction.data.name} command`);
      const _reply = Amane.commands.get(interaction.data.name!)?.execute(Amane, interaction).then((embed) => {
        Amane.helpers.sendInteractionResponse(interaction.id, interaction.token, {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            embeds: [embed.data],
          },
        });
      });
      break;
    }
  }
};
