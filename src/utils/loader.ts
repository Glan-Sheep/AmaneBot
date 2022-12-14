import log from "./logger.ts";
import { expandGlob } from "../deps.ts";
import { Amane } from "../bot.ts";

let path : string;

export function importPath(_path: string) {
  path = _path;
  console.log(_path);
}

export async function importCommands() {
  for await (const file of expandGlob(`${path}commands/**/*.ts`)) {
    if (file.name === "template.ts") continue;
    log.info(`Loading [Cmd]${file.name}...`);
    await import("file://" + file.path);
  }
}
export async function importEvents() {
  for await (const file of expandGlob(`${path}events/**/*.ts`)) {
    log.info(`Loading [Event]${file.name}...`);
    await import("file://" + file.path);
  }
}
