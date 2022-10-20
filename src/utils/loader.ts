import log from "./logger.ts";
import { expandGlob } from "../deps.ts";
import { directory } from "../bot.ts";

export async function importCommands() {
  for await (const file of expandGlob(`${directory()}commands/**/*.ts`)) {
    if (file.name === "template.ts") continue;
    log.info(`Loading [Cmd]${file.name}...`);
    await import("file://" + file.path);
  }
}
export async function importEvents() {
  for await (const file of expandGlob(`${directory}events/**/*.ts`)) {
    log.info(`Loading [Event]${file.name}...`);
    await import("file://" + file.path);
  }
}
