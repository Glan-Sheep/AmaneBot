import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
} from "discordeno/mod.ts";
import { axiod } from "axiod";
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";

createCommand({
  name: "nnh",
  description: "今日が何の日かを取得します",
  type: ApplicationCommandTypes.ChatInput,
  async execute(): Promise<EmbedBuilder> {
    const embeds = new EmbedBuilder();

    const date = new Date();
    const m = ("00" + (date.getMonth() + 1)).slice(-2);
    const d = ("00" + (date.getDate())).slice(-2);

    const data = await axiod.get(`https://api.whatistoday.ml/v2/anniv/${m}${d}`);
    const items = data.data["_items"][0]
    console.log(items);
    for (let i = 1; i <= 5; i++) {
      const item = items[`anniv${i}`]
      if (item == "") break;
      else {
        embeds.addFields({
          name: `${item}`,
          value: "",
        });
      }
    }
    embeds.setTitle("今日は何の日？？");
    embeds.setFooter({text: "powered by whatistodayAPI"});
    return embeds;
  },
});
