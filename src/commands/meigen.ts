import { ApplicationCommandTypes, axiod } from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";

createCommand({
  name: "meigen",
  description: "ランダムで名言を表示します",
  type: ApplicationCommandTypes.ChatInput,
  execute(): EmbedBuilder {
    const embeds = new EmbedBuilder();
    (async () => {
      const data = await axiod.get("https://meigen.doodlenote.net/api/json.php");
      embeds
      .setTitle(data.data[0].auther)
      .setDescription(data.data[0].meigen)
    })
    return embeds
  },

});