import log from "./logger.ts";
import { expandGlob } from "../deps.ts";
import { Amane } from "../bot.ts";

export async function importCommands(path:string) {
  for await (const file of expandGlob(`${path}commands/**/*.ts`)) {
    if (!(file.name === "meigen.ts")) continue;
    log.info(`Loading [Cmd]${file.name}...`)
    const cmd = () => import(file.path).then(function(cmd) {
      Amane.commands.set(cmd.name, {
        name: cmd.name,
        description: cmd.description,
        options: cmd.options
      })
    })
  }
}
export async function importEvents(path:string) {
  for await (const file of expandGlob(`${path}events/**/*.ts`)) {
    log.info(`Loading [Event]${file.name}...`);
    await import(file.path);
  }
}