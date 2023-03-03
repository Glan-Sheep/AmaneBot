import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
} from "discordeno/mod.ts";
import { axiod } from "axiod";
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";
import { response } from "utils/embedResponse.ts";

createCommand({
  name: "birthflower",
  description: "誕生日花を取得します",
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.Integer,
      name: "month",
      description: "何月かを入力してください",
      required: true,
      minValue: 1,
      maxValue: 12,
    },
    {
      type: ApplicationCommandOptionTypes.Integer,
      name: "day",
      description: "何日かを入力してください",
      required: true,
      minValue: 1,
      maxValue: 31,
    }
  ],
  async execute(interaction, args) {
    const embeds = new EmbedBuilder();
    const m = ("00" + args[0].value).slice(-2);
    const d = ("00" + args[1].value).slice(-2);
    const data = await axiod.get(`https://api.whatistoday.ml/v2/birthflower/${m}${d}`);
    const item = data.data["_items"][0];
    embeds.setTitle(`${item["flower"]}`);
    embeds.setDescription(`${args[0].value}月${args[1].value}日の花`);
    embeds.addFields({
      name: "意味",
      value: item["lang"]
    });
    embeds.setFooter({text: "powered by whatistodayAPI"});
    response(interaction, embeds);
  },
});
