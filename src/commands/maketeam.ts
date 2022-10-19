import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
} from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";

createCommand({
  name: "maketeam",
  description: "2つのチームを作成します",
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.User,
      name: "mem1",
      description: "参加するメンバーを選択",
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: "mem2",
      description: "参加するメンバーを選択",
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: "mem3",
      description: "参加するメンバーを選択",
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: "mem4",
      description: "参加するメンバーを選択",
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: "mem5",
      description: "参加するメンバーを選択",
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: "mem6",
      description: "参加するメンバーを選択",
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: "mem7",
      description: "参加するメンバーを選択",
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: "mem8",
      description: "参加するメンバーを選択",
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: "mem9",
      description: "参加するメンバーを選択",
    },
    {
      type: ApplicationCommandOptionTypes.User,
      name: "mem10",
      description: "参加するメンバーを選択",
    },
  ],
  execute(interaction): EmbedBuilder {
    const embeds = new EmbedBuilder();
    const msg = interaction.data?.options;
    if (msg !== undefined) {
      // deno-lint-ignore no-array-constructor
      const members = new Array();
      for (let i = 0; i < msg.length; i++) {
        if (msg[i].value !== "") {
          members.push(msg[i].value);
        } else {
          break;
        }
      }
      _arrayShuffle(members);
      const _TeamA = members.slice(0, members.length / 2);
      const _TeamB = members.slice(members.length / 2, members.length);

      let _TeamA_str = "";
      let _TeamB_str = "";

      for (let i = 0; i < _TeamA.length; i++) {
        _TeamA_str += ` <@${_TeamA[i]}>`;
      }
      for (let i = 0; i < _TeamB.length; i++) {
        _TeamB_str += ` <@${_TeamB[i]}>`;
      }

      embeds.setTitle("MakeTeam!").setDescription(`
        🌀 **Team 🅰**${_TeamA_str}
        🌀 **Team 🅱**${_TeamB_str}
      `);
    }

    function _arrayShuffle(array: Array<string | number | boolean>) {
      for (let i = array.length - 1; 0 < i; i--) {
        // 0〜(i+1)の範囲で値を取得
        const r = Math.floor(Math.random() * (i + 1));
        // 要素の並び替えを実行
        const tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
      }
      return array;
    }
    return embeds;
  },
});
