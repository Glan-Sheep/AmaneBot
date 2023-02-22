import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "discordeno/mod.ts";
import { axiod } from "axiod"
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";

createCommand({
  name: "elevation",
  description: "標高を取得します",
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: "place",
      description: "取得したい地名を入力(ローマ字で入力してください)",
      required: true,
    },
  ],
  async execute(_interaction, args): Promise<EmbedBuilder> {
    const place_data = await axiod.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${args[0].value}&count=1`
    );
    const latitude = place_data.data.results[0].latitude;
    const longitude = place_data.data.results[0].longitude;
    const data = await axiod.get(`https://api.open-meteo.com/v1/elevation?latitude=${latitude}&longitude=${longitude}`);

    const elevation = data.data.elevation[0];
    const embeds = new EmbedBuilder();
    embeds.setTitle(args[0].value + " elevation");
    embeds.setDescription(elevation + "m");
    return embeds;
  },
});
