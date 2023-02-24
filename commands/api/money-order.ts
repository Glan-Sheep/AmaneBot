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
    const USDJPY = await axiod.get(
      `https://api.excelapi.org/currency/rate?pair=usd-jpy`
    );
    const EURJPY = await axiod.get(
      `https://api.excelapi.org/currency/rate?pair=gbp-jpy`
    );
    const GBPJPY = await axiod.get(
      `https://api.excelapi.org/currency/rate?pair=eur-jpy`
    );
    embeds.setTitle("今日の為替レート");
    embeds.addFields({
      name: `ドル/円`,
      value: `${USDJPY.data}`,
      inline: true,
    });
    embeds.addFields({
      name: `ユーロ/円`,
      value: `${EURJPY.data}`,
      inline: true,
    });
    embeds.addFields({
      name: `英ポンド/円`,
      value: `${GBPJPY.data}`,
      inline: true,
    });
    return embeds;
  },
});
