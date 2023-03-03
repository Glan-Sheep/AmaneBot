import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
} from "discordeno/mod.ts";
import { axiod } from "axiod";
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";
import { response } from "utils/embedResponse.ts";

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
  async execute(interaction, args) {
    const embeds = new EmbedBuilder();

    const data = await axiod.get(`https://ja.wikipedia.org/api/rest_v1/page/summary/${args[0].value}`);
    console.log(data.status)
    if (data.status == 404) {
      embeds.setTitle("Not Found")
        .setDescription(`${args[0].value}は見つかりませんでした。
別の名前で試してみてください！`)
      response(interaction, embeds);
    }
    embeds.setTitle(args[0].value)
      .setDescription(data.data["extract"]);
    response(interaction, embeds);
  },
});
