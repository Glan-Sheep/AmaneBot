import { ApplicationCommandTypes } from "discordeno/mod.ts";
import { axiod } from "axiod"
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";
import { response } from "utils/embedResponse.ts";

createCommand({
  name: "meigen",
  description: "ランダムで名言を表示します",
  type: ApplicationCommandTypes.ChatInput,
  async execute(interaction) {
    const data = await axiod.get("https://meigen.doodlenote.net/api/json.php");
    const embeds = new EmbedBuilder()
      .setTitle(data.data[0].auther)
      .setDescription(data.data[0].meigen);
    response(interaction, embeds);
  },
});
