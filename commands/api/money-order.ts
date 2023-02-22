import { ApplicationCommandTypes } from "discordeno/mod.ts";
import { axiod } from "axiod"
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";

createCommand({
  name: "money-order",
  description: "為替レートを取得します。",
  type: ApplicationCommandTypes.ChatInput,
  async execute(_interaction, args): Promise<EmbedBuilder> {
    const embeds = new EmbedBuilder();
    const data = await axiod.get(
      `https://dotnsf-fx.herokuapp.com/`
    );
    embeds.setTitle("今日の為替レート");
    embeds.addFields({
      name: `ドル/円`,
      value: `${data.data.rate.USDJPY}`,
      inline: true,
    });
    embeds.addFields({
      name: `ユーロ/円`,
      value: `${data.data.rate.EURJPY}`,
      inline: true,
    });
    embeds.addFields({
      name: `英ポンド/円`,
      value: `${data.data.rate.GBPJPY}`,
      inline: true,
    });
    return embeds;
  },
});
