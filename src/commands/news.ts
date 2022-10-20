import { ApplicationCommandTypes, axiod } from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";

createCommand({
  name: "news",
  description: "国内の最新ニュースを表示します",
  type: ApplicationCommandTypes.ChatInput,
  async execute(): Promise<EmbedBuilder> {
    const data = await axiod.get("https://api.rss2json.com/v1/api.json?rss_url=https://news.yahoo.co.jp/rss/topics/top-picks.xml");
    let description = "";
    const resdata = data.data.items;
    const embeds = new EmbedBuilder();
    for (let i = 0; i < resdata.length; i++) {
      const element = resdata[i];
      description += `${element.title}[🔗](${element.link})\n`;
    }
    embeds
      .setTitle("国内の最新ニュース")
      .setDescription(description)
    return embeds;
  },
});