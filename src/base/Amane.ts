import { Collection } from "https://deno.land/x/discordeno@16.0.1/mod.ts";
import { expandGlob } from "https://deno.land/std@0.158.0/fs/mod.ts";

class Amane {
  commands: Collection<string, {
    name: string,
    description: string,
    options: unknown,
  }>
  constructor() {
    this.commands = new Collection();
  }

  private async loadSlashCommands(path: string) {
    //const command = await import(path);
    for await (const file of expandGlob(`${path}commands/**/*.js`)) {
      console.log(file);
    }
  }

  init(path: string) {
    this.loadSlashCommands(path);
  }
}

export default Amane;