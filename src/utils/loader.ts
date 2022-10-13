import log from "./logger.ts";
import { expandGlob } from "../deps.ts";

export async function importCommands(path:string) {
  for await (const file of expandGlob(`${path}commands/**/*.ts`)) {
    log.info(`Loading [Cmd]${file.name}...`)
    await import(file.path);
  }
}
export async function importEvents(path:string) {
  for await (const file of expandGlob(`${path}events/**/*.ts`)) {
    log.info(`Loading [Event]${file.name}...`)
    await import(file.path);
  }
}