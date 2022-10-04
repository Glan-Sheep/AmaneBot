import { expandGlob } from "https://deno.land/std@0.158.0/fs/mod.ts";
import { Client, Intents, Collection } from "npm:discord.js@13.11.0"

class Amane extends Client {
  commands: Collection<string, {
    name: string,
    description: string,
    options: unknown,
  }>
  constructor() {
    super({
      partials: ["USER", "GUILD_MEMBER", "MESSAGE", "CHANNEL", "REACTION"],
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
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