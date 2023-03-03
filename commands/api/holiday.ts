import { ApplicationCommandTypes } from "discordeno/mod.ts";
import { axiod } from "axiod"
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";
import { response } from "utils/embedResponse.ts";

createCommand({
  name: "holiday",
  description: "次の祝日を取得します",
  type: ApplicationCommandTypes.ChatInput,
  async execute(interaction) {
    const embeds = new EmbedBuilder();
    const this_year = new Date().getFullYear();
    const this_date = new Date();
    const response_this = await axiod.get(
      `https://holidays-jp.github.io/api/v1/${this_year}/date.json`
    );
    let data = Object.entries(response_this.data);
    if (new Date(data[data.length - 1][0]) < this_date) {
      const response_next = await axiod.get(
        `https://holidays-jp.github.io/api/v1/${this_year + 1}/date.json`
      );
      data = Object.entries(response_next.data);
    }
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const element_date = new Date(element[0]);
      if (element_date > this_date) {
        embeds.addFields({
          name: `${element[1]}`,
          value: `**${element_date.getMonth() + 1
            }月${element_date.getDate()}日${["日", "月", "火", "水", "木", "金", "土"][element_date.getDay()]
            }曜日**`,
          inline: true,
        });
        count++;
        if (count === 3) break;
      }
    }
    embeds.setTitle("次の祝日");
    response(interaction, embeds);
  },
});
