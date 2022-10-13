import { Amane } from "../bot.ts";

export async function updateAppcationCommands() {
  await Amane.helpers.upsertGlobalApplicationCommands(
    Amane.commands.array()
  )
}