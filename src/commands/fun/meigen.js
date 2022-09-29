const axios = require("axios");
const { SlashCommand } = require("../../lib"),
  { MessageEmbed } = require('discord.js');


class Meigen extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "meigen",
      description: "ランダムで名言を表示します。"
    });
  }

  async run(client, args) {
    const data = await axios.get("https://meigen.doodlenote.net/api/json.php");
    const embed = new MessageEmbed();

    embed
      .setTitle(data.data[0].auther)
      .setDescription(data.data[0].meigen)
      .setColor("#0099ff")

    super.respond(embed);
  }
}

exports.default = Meigen;
