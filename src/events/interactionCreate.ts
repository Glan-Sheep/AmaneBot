import { Amane } from "../bot.ts";
import { InteractionResponseTypes, InteractionTypes } from "../deps.ts";
import log from "../utils/logger.ts";

Amane.events.interactionCreate = (_, interaction) => {
  if (!interaction.data) return;

  switch (interaction.type) {
    case InteractionTypes.ApplicationCommand: {
      log.info(`[Application Command] ${interaction.data.name} command`);
      //const _reply = Amane.commands.get(interaction.data.name!)?.execute(Amane, interaction);
      const cmdPath = Amane.commandsPath.get(interaction.data.name!)?.path;
      const cmd = await import(cmdPath);
      log.info(_reply)
      if (_reply !== undefined) {
        Amane.helpers.sendInteractionResponse(
          interaction.id,
          interaction.token,
          {
            type: InteractionResponseTypes.ChannelMessageWithSource,
            data: {
              embeds: [_reply.data],
            },
          }
        );
      }
    }
  }
};
