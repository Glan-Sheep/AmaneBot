import { BotClient } from "../bot.ts";
import { ApplicationCommandOption, ApplicationCommandTypes, Interaction } from "../deps.ts";
import { EmbedBuilder } from "./mod.ts";

export class Command {
  bot: BotClient;
  enable: boolean;
  name: string;
  description: string;
  type: ApplicationCommandTypes;
  options: ApplicationCommandOption[];
  interaction: Interaction|undefined;
  constructor(bot: BotClient, options = {
    enable: true,
    name: "TEST",
    description: "説明なし",
    type: ApplicationCommandTypes.ChatInput,
    options: [],
  }) {
    this.bot = bot;

    this.enable = options.enable ?? true
    this.name = options.name ?? null;
    this.description = options.description ?? "説明なし";
    this.type = options.type ?? ApplicationCommandTypes.ChatInput,
    this.options = options.options ?? [];
  }

  setInteraction(interaction: Interaction) {
    this.interaction = interaction;
  }

  async execute(bot: BotClient, interaction: Interaction): Promise<EmbedBuilder | null> {
    return null;
  }
}