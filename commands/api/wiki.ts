import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
} from "discordeno/mod.ts";
import { axiod } from "axiod";
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";

createCommand({
  name: "wiki",
  description: "Wikipediaの記事の概要を取得します",
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: "word",
      description: "検索するワードを指定します",
      required: true,
    }
  ],
  async execute(_interaction, args): Promise<EmbedBuilder> {
    const embeds = new EmbedBuilder();

    const data = await axiod.get(`https://api.excelapi.org/wikipedia/summary2?word=${args[0].value}`);
    embeds.setTitle(args[0].value)
      .setDescription(data.data);
    return embeds;
  },
});
