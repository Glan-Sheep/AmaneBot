import {
  ApplicationCommandTypes,
  ApplicationCommandOptionTypes,
} from "discordeno/mod.ts";
import { axiod } from "axiod";
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";
import { response } from "utils/embedResponse.ts";

createCommand({
  name: "yesno",
  description: "YesかNoかを答えます(1万回に1回maybeと答えます)",
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: "question",
      description: "質問事項を書いてください",
      required: false,
    },
  ],
  type: ApplicationCommandTypes.ChatInput,
  async execute(interaction, args) {
    const data = await axiod.get("https://yesno.wtf/api");
    const resdata = data.data;
    const embeds = new EmbedBuilder().setImage(resdata.image);
    if (resdata.answer == "yes") {
      if (args) {
        embeds.setTitle(`${args[0].value}
>> YES <<`);
      } else {
        embeds.setTitle(">> YES <<");
      }
    } else if (resdata.answer == "no") {
      if (args) {
        embeds.setTitle(`${args[0].value}
>> NO <<`);
      } else {
        embeds.setTitle(">> NO <<");
      }
    } else {
      if (args) {
        embeds.setTitle(`${args[0].value}
>> MAYBE <<`);
      } else {
        embeds.setTitle(">> MAYBE <<");
      }
    }
    response(interaction, embeds);
  },
});
