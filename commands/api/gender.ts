import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "discordeno/mod.ts";
import { axiod } from "axiod"
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";

createCommand({
  name: "gender",
  description: "あなたの名前から性別を推測します",
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: "name",
      description: "推測したい名前を入力(ローマ字で入力してください)",
      required: true,
    },
  ],
  type: ApplicationCommandTypes.ChatInput,
  async execute(_interaction, args): Promise<EmbedBuilder> {
    const embeds = new EmbedBuilder();
    const data = await axiod.get(
      `https://api.genderize.io/?name=${args[0].value}`
    );
    const probability: number = Math.round(data.data.probability * 100);
    if (data.data.gender === "female") {
      embeds.setDescription(`あなたは女性ですね？
      確率:${probability}%`);
    } else if (data.data.gender === "male") {
      embeds.setDescription(`あなたは男性ですね？
      確率:${probability}%`);
    } else {
      embeds.setDescription("推測できませんでした...");
    }
    embeds.setTitle("性別推測");
    return embeds;
  },
});
