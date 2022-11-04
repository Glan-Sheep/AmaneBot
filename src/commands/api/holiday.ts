import { ApplicationCommandTypes, axiod } from "../../deps.ts";
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "../../lib/mod.ts";

createCommand({
  name: "holiday",
  description: "次の祝日を取得します",
  type: ApplicationCommandTypes.ChatInput,
  async execute(): Promise<EmbedBuilder> {
    const embeds = new EmbedBuilder();
    const this_year = new Date().getFullYear();
    const this_date = new Date();
    const response = await axiod.get(
      `https://holidays-jp.github.io/api/v1/${this_year}/date.json`
    );
    const data = Object.entries(response.data);
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const element_date = new Date(element[0]);
      if (element_date > this_date) {
        embeds.addFields({
          name: `${element[1]}`,
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
