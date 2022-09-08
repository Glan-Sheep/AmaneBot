const { SlashCommand } = require("../lib");
const { MessageEmbed } = require("discord.js");

class Maketeam extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "maketeam",
      description: "2つのチームを作成します",
      options: [
        {
          type: 6,
          name: "mem1",
          description: "参加するメンバーを選択",
          required: true
        },
        {
          type: 6,
          name: "mem2",
          description: "参加するメンバーを選択",
          required: true
        },
        {
          type: 6,
          name: "mem3",
          description: "参加するメンバーを選択",
          required: true
        },
        {
          type: 6,
          name: "mem4",
          description: "参加するメンバーを選択",
        },
        {
          type: 6,
          name: "mem5",
          description: "参加するメンバーを選択",
        },
        {
          type: 6,
          name: "mem6",
          description: "参加するメンバーを選択",
        },
        {
          type: 6,
          name: "mem7",
          description: "参加するメンバーを選択",
        },
        {
          type: 6,
          name: "mem8",
          description: "参加するメンバーを選択",
        },
        {
          type: 6,
          name: "mem9",
          description: "参加するメンバーを選択",
        },
        {
          type: 6,
          name: "mem10",
          description: "参加するメンバーを選択",
        }
      ]
    });
  }

  async run(client) {
    const interaction = this.interaction;
    const msg = interaction.data;
    console.log(msg)
    let members = new Array;
    for (let i = 0; i < msg.options.length; i++) {
      if (msg.options[i].value !== "") {
        members.push(msg.options[i].value);
      }else{
        break;
      }
    }
    function arrayShuffle(array) {
      for(var i = (array.length - 1); 0 < i; i--){
        // 0〜(i+1)の範囲で値を取得
        var r = Math.floor(Math.random() * (i + 1));
        // 要素の並び替えを実行
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
      }
      return array;
    }

    arrayShuffle(members);

    const TeamA = members.slice(0, members.length / 2);
    const TeamB = members.slice(members.length / 2, members.length);

    let TeamA_str = "";
    let TeamB_str = "";

    for (let i = 0; i < TeamA.length; i++) {
      TeamA_str += ` <@${TeamA[i]}>`;
    }
    for (let i = 0; i < TeamB.length; i++) {
      TeamB_str += ` <@${TeamB[i]}>`;
    }

    const embeds = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("MakeTeam!")
      .setDescription(`
      🌀 **Team 🅰**${TeamA_str}
      🌀 **Team 🅱**${TeamB_str}
      `);
    super.respond(embeds);
  }
}

exports.default = Maketeam;
