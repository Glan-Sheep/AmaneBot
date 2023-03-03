import { Amane } from "../bot.ts";
import { Interaction, InteractionResponseTypes } from "discordeno/mod.ts";
import { EmbedBuilder } from "lib/embed.ts";
import log from "utils/logger.ts";

const error_embeds = new EmbedBuilder().setTitle("⚠️ERROR⚠️")
  .setDescription(`予期せぬエラーが発生しました。
オプションを確認し、
時間を置いて再度試してください。`);

export function response(interaction: Interaction, reply: EmbedBuilder) {
  Amane.helpers.sendInteractionResponse(interaction.id, interaction.token, {
    type: InteractionResponseTypes.ChannelMessageWithSource,
    data: {
      embeds: [reply.data],
    },
  });
}

export function responseError(interaction: Interaction) {
  Amane.helpers.sendInteractionResponse(interaction.id, interaction.token, {
    type: InteractionResponseTypes.ChannelMessageWithSource,
    data: {
      embeds: [error_embeds.data],
    },
  });
}
