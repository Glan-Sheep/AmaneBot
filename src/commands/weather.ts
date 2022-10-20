import { ApplicationCommandOptionTypes, ApplicationCommandTypes, axiod } from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";

createCommand({
  name: "weather",
  description: "天気を取得します",
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: "place",
      description: "取得したい地名を入力(ローマ字で入力してください)",
      required: true
    }
  ],
  type: ApplicationCommandTypes.ChatInput,
  async execute(interaction, args): Promise<EmbedBuilder> {
    const embeds = new EmbedBuilder();
    const place_data = await axiod.get(`https://geocoding-api.open-meteo.com/v1/search?name=${args[0].value}&count=1`);
    const country = place_data.data.results[0].country_code;
    if (country !== "JP") {
      embeds
        .setTitle("その地名は日本ではありません")
        .setDescription("日本のみです");
    } else {
      const latitude = place_data.data.results[0].latitude;
      const longitude = place_data.data.results[0].longitude;

      const wea_data = await axiod.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FTokyo`);
      for (let i = 0; i < wea_data.data.daily.time.length; i++) {
        embeds.addFields({ name: `[${wea_data.data.daily.time[i]}]`,
        value:`最低気温：${wea_data.data.daily.temperature_2m_min[i]}℃
        最高気温：${wea_data.data.daily.temperature_2m_max[i]}℃
        降水量：${wea_data.data.daily.precipitation_sum[i]}mm`
        , inline: true });
      }
      embeds
        .setTitle(`${place_data.data.results[0].name} weather`)
    }
    return embeds;
  },
});
