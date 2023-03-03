import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "discordeno/mod.ts";
import { axiod } from "axiod"
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";
import { response } from "utils/embedResponse.ts";

createCommand({
  name: "url",
  description: "国内の最新ニュースを表示します",
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: "url",
      description: "圧縮したいURLを入力",
      required: true,
    },
  ],
  type: ApplicationCommandTypes.ChatInput,
  async execute(interaction, args) {
    const data = await axiod.get(
      "https://is.gd/create.php?format=simple&url=" + args[0].value
    );
    const resdata = data.data;
    const embeds = new EmbedBuilder()
      .setTitle("URLを圧縮したよ！")
      .setDescription(resdata);
    response(interaction, embeds);
  },
});
