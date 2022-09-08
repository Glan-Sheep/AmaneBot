const { SlashCommand } = require("../lib");
const axios = require("axios");
const { MessageEmbed } = require("discord.js");

class Url extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "url",
      description: "URLを圧縮します",
      options: [
        {
          type: 3,
          name: "url",
          description: "圧縮したいURLを入力",
          required: true
        }
      ]
    });
  }

  async run(client, args) {
    const interaction = this.interaction;
    const ApiURL = "https://ux.nu/api/short?url=" + args[0].value;
    const res = await axios.get(ApiURL);
    const resdata = res.data.data.url;
    const embeds = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("URLを圧縮したよ！")
      .setDescription(resdata);
    super.respond(embeds);
  }
}

exports.default = Url;
