import axios from "npm:axios@1.0.0";
import { config } from "../deps.ts";
const env = config();
const TOKEN = env["TOKEN"],
  DEV_API_URL = env["DEV_API_URL"]

const Header = {
  headers: {
    Authorizatioon: "Bot " + TOKEN,
    "Content-Type": "application/json",
  },
};

export class SlashCommand {
  client: any;
  enable: boolean;
  name: string;
  description: string;
  options: Array<any>;

  interaction: any;
  id: any;
  constructor(
    client,
    options = {
      enable: true,
      name: "",
      description: "説明なし",
      options: [],
    }
  ) {
    this.client = client;

    this.enable = options.enable ?? true;
    this.name = options.name ?? "";
    this.description = options.description ?? "説明なし";
    this.options = options.options ?? [];
  }

  /*setInteraction(interaction) {
    this.interaction = interaction;
  }*/

  respond(data: any) {
    return this.client.api
      .interactions(this.interaction.id, this.interaction.token)
      .callback.post({data: {type: 4, data: {embeds: [data]}}});
  }

  async run(client, args) {
  }

  async run(client, _args: unknown) {}

  async array() {
    const res = await axios.get(DEV_API_URL, Header);
    if (res.data) {
      return res.data;
    }
    return res.data;
  }
}
