import { ApplicationCommandTypes } from "../deps.ts";
import { createCommand } from "./mod.ts";
import { EmbedBuilder } from "../lib/mod.ts";

createCommand({
  name: "cmdName",
  description: "cmdDescription",
  type: ApplicationCommandTypes.ChatInput,
  async execute(): Promise<EmbedBuilder> {
    const embeds = new EmbedBuilder()
    return embeds;
  },
});
