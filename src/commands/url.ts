import { ApplicationCommandOptionTypes, ApplicationCommandTypes, axiod } from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";

createCommand({
  name: "url",
  description: "国内の最新ニュースを表示します",
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: "url",
      description: "圧縮したいURLを入力",
      required: true
    }
  ],
  type: ApplicationCommandTypes.ChatInput,
  async execute(_interaction, args): Promise<EmbedBuilder> {
    const data = await axiod.get("https://ux.nu/api/short?url=" + args[0].value);
    const resdata = data.data.data.url;
    const embeds = new EmbedBuilder()
      .setTitle("URLを圧縮したよ！")
      .setDescription(resdata);
    return embeds;
  },
});