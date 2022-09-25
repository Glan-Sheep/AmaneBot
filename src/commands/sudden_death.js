const { SlashCommand } = require("../lib"),
  axios = require("axios"),
  split = require("graphemesplit"),
  { MessageEmbed } = require("discord.js");

class Sudden_death extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "sudden_death",
      description: "突然の死を生成します。",
      options: [
        {
          type: 3,
          name: "text",
          description: "生成したい文字列を入力",
          required: true
        }
      ]
    });
  }

  async run(client) {
    const interaction = this.interaction;
    const msg = interaction.data.options[0].value;
    const lines = msg.split("\n");
    const lenMax = Math.max(...lines.map((v) => getLength(v)));

    const toge = ["＿人" + "人".repeat(lenMax) + "人＿"];
    lines.forEach((text) =>
    toge.push('＞　' + text + '　'.repeat(lenMax - getLength(text)) + '　＜')
    );
    toge.push('￣Y^' + 'Y^'.repeat(lenMax) + 'Y￣');

    const result = toge.reduce(
      (accumulator, currentValue) => accumulator + '\n' + currentValue
    );
    function getLength(text) {
      const lines = split(text);
      let len = 0;
      lines.forEach((value) => {
        if (!value.match(/[^\x01-\x7E]/) || !value.match(/[^\uFF65-\uFF9F]/)) {
          len += 0.5;
        } else {
          len += [...value].length;
        }
      });
      return Math.ceil(len);
    }
    const embeds = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("突然の死を生成したよ！")
      .setDescription(result);
    super.respond(embeds);
  }
}

exports.default = Sudden_death;
