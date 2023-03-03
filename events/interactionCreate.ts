import { Amane } from "../bot.ts";
import {
  InteractionTypes,
} from "discordeno/mod.ts";

Amane.events.interactionCreate = (_, interaction) => {
  if (!interaction.data) return;

  switch (interaction.type) {
    case InteractionTypes.ApplicationCommand: {
      const args = interaction.data.options;
      if (!args) {
        Amane.commands
          .get(interaction.data.name!)
          ?.execute(interaction);
      } else {
        Amane.commands
          .get(interaction.data.name!)
          ?.execute(interaction, args);
      }
      break;
    }
  }
};
