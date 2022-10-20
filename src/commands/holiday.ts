import { ApplicationCommandTypes, axiod } from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";

createCommand({
  name: "holiday",
  description: "次の祝日を取得します",
  type: ApplicationCommandTypes.ChatInput,
  async execute(): Promise<EmbedBuilder> {
    const embeds = new EmbedBuilder();
    const this_year = new Date().getFullYear();
    const this_date = new Date();
    const data = await axiod.get(
      `https://kenkyu392.github.io/holidays-jp/v1/${this_year}/date.json`
    );
    let count = 0;
    for (let i = 0; i < data.data.holidays.length; i++) {
      const element = data.data.holidays[i];
      const element_date = new Date(element.date);
      if (element_date > this_date) {
        embeds.addFields({
          name: `${element.i18n["ja-JP"]}`,
          value: `**${
            element_date.getMonth() + 1
          }月${element_date.getDate()}日${
            ["日", "月", "火", "水", "木", "金", "土"][element_date.getDay()]
          }曜日**`,
          inline: true,
        });
        count++;
        if (count === 3) break;
      }
    }
    embeds.setTitle("次の祝日");
    return embeds;
  },
});
