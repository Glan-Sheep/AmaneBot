import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
} from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";

createCommand({
  name: "random",
  description: "乱数を生成します",
  options: [
    {
      type: ApplicationCommandOptionTypes.Number,
      name: "min",
      description: "最小値を入力",
      minValue: 0,
      maxValue: 2147483647,
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.Number,
      name: "max",
      description: "最大値を入力",
      minValue: 0,
      maxValue: 2147483647,
      required: true,
    },
  ],
  type: ApplicationCommandTypes.ChatInput,
  execute(_interaction, args): EmbedBuilder {
    const num = getRandomInt(args[0].value, args[1].value);
    let num_emoji = "";
    for (let i = 0; i < num.toString().length; i++) {
      switch (num.toString().charAt(i)) {
        case "0":
          num_emoji += "0️⃣";
          break;
        case "1":
          num_emoji += "1️⃣";
          break;
        case "2":
          num_emoji += "2️⃣";
          break;
        case "3":
          num_emoji += "3️⃣";
          break;
        case "4":
          num_emoji += "4️⃣";
          break;
        case "5":
          num_emoji += "5️⃣";
          break;
        case "6":
          num_emoji += "6️⃣";
          break;
        case "7":
          num_emoji += "7️⃣";
          break;
        case "8":
          num_emoji += "8️⃣";
          break;
        case "9":
          num_emoji += "9️⃣";
          break;
      }
    }
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }
    const embeds = new EmbedBuilder()
      .setTitle("乱数を生成したよ！")
      .setDescription(`${num_emoji}`)
      .setFooter({
        text: `${args[0].value}から${args[1].value}までの乱数です`,
      });
    return embeds;
  },
});
