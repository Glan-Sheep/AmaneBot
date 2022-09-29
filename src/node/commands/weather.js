const { SlashCommand } = require("../lib");
const axios = require("axios");
const { MessageEmbed } = require("discord.js");

class Weather extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "weather",
      description: "天気を取得します",
      options: [
        {
          type: 3,
          name: "place",
          description: "取得したい地名を入力(ローマ字で入力してください)",
          required: true
        }
      ]
    });
  }

  async run(client) {
    const interaction = this.interaction;
    const place = interaction.data.options[0].value;
    const place_ApiURL = `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=1`;
    const place_res = await axios.get(place_ApiURL);
    console.log(place_res.data);
    const country = place_res.data.results[0].country_code;
    if (country !== "JP") {
      const embeds = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("その地名は日本ではありません")
        .setDescription("日本のみです");
      super.respond(embeds);
    } else {
      const latitude = place_res.data.results[0].latitude;
      const longitude = place_res.data.results[0].longitude;


      const wea_ApiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FTokyo`;
      const wea_res = await axios.get(wea_ApiURL);
      console.log(wea_res.data);

      const embeds = new MessageEmbed()

      for (let i = 0; i < wea_res.data.daily.time.length; i++) {
        embeds.addFields({ name: `[${wea_res.data.daily.time[i]}]`,
        value:`最低気温：${wea_res.data.daily.temperature_2m_min[i]}℃
        最高気温：${wea_res.data.daily.temperature_2m_max[i]}℃
        降水量：${wea_res.data.daily.precipitation_sum[i]}mm`
        , inline: true });
      }
      embeds
        .setColor("#0099ff")
        .setTitle(`${place_res.data.results[0].name} weather`)
      super.respond(embeds);
    }
  }
}

exports.default = Weather;
