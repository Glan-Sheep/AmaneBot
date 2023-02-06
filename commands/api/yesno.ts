import { ApplicationCommandTypes } from "discordeno/mod.ts";
import {axiod} from "axiod"
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";

createCommand({
  name: "yesno",
  description: "YesかNoかを答えます(1万回に1回maybeと答えます)",
  type: ApplicationCommandTypes.ChatInput,
  async execute(_interaction): Promise<EmbedBuilder> {
    const data = await axiod.get(
      "https://yesno.wtf/api"
    );
    const resdata = data.data;
    const embeds = new EmbedBuilder()
      .setImage(resdata.image);
    if (resdata.answer == "yes") {
      embeds.setTitle("YES")
    }else{
      embeds.setTitle("NO")
    }
    return embeds;
  },
});
