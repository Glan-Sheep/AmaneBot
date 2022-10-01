import { BotClient } from "../bot.ts";
import { ApplicationCommandOption, ApplicationCommandTypes, Interaction } from "../deps.ts";

export interface SlashCommand {
  name: string;

  description: string;

  type: ApplicationCommandTypes;

  options?: ApplicationCommandOption[];

  excute: (bot: BotClient, interaction: Interaction) => unknown;
}