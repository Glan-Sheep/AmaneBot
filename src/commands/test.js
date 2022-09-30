const { SlashCommand } = require("../lib");
const { MessageEmbed } = require('discord.js');


class Test extends SlashCommand {
  constructor(client) {
    super(client, {
      enable: false,
      name: "test",
      description: "テスト用",
    });
  }

  async run(client) {
    const interaction = this.interaction;
    const id = interaction.member.user.id;
    const embeds = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addField('Inline field title', 'Some value here', true)
    .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    super.respond(embeds);
  }
}

exports.default = Test;