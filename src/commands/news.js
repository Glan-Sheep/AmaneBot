const { SlashCommand } = require("../lib"),
  axios = require("axios"),
  split = require("graphemesplit"),
  { MessageEmbed } = require("discord.js");

class News extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "news",
      description: "国内の最新ニュースを表示します。",
    });
  }

  async run(client) {
    const interaction = this.interaction;
    const ApiURL = "https://api.rss2json.com/v1/api.json?rss_url=https://news.yahoo.co.jp/rss/topics/top-picks.xml";
    const res = await axios.get(ApiURL);
    const resdata = res.data.items;

    let description = "";
    const embeds = new MessageEmbed()
    for(let i = 0; i < resdata.length; i++) {
      description += `${resdata[i].title}[🔗](${resdata[i].link})\n`;
    }
    embeds
      .setColor("#0099ff")
      .setTitle("国内の最新ニュース")
      .setDescription(description)
    super.respond(embeds);
  }
}

exports.default = News;
