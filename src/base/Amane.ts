import { expandGlob } from "https://deno.land/std@0.158.0/fs/mod.ts";
import { config, Client, Collection, Intents } from "../deps.ts";

const env = config();

class Amane extends Client {
  commands: Collection<
    string,
    {
      name: string;
      description: string;
      options: unknown;
    }
  >;
  commandData: {
    name: string,
    description: string,
    options: unknown
  }[];
  path: string;
  constructor() {
    super({
      partials: ["USER", "GUILD_MEMBER", "MESSAGE", "CHANNEL", "REACTION"],
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
    this.commands = new Collection();

    this.commandData = [];

    this.path = "";
}

  async loadSlashCommands(client: Client) {
    //const command = await import(path);
    for await (const file of expandGlob(`${this.path}commands/**/*.ts`)) {
      console.log(file.path);
      const command = await import(file.path);

      if (command.enable) {
        this.commandData.push({
          name: command.name,
          description: command.description,
          options: command.options,
        });
        client.ws.on("INTERACTION_CREATE", (interaction: any) => {
          const cmd = interaction.data.name.toLowerCase();
          const args = interaction.data.options;
          if (cmd === command.name) {
            command.setInteraction(interaction);
            command.run(client, args);
          }
        });
      }
      console.log();
    }
  }

  private async loadEvents() {
    for await (const file of expandGlob(`${this.path}events/*.ts`)) {
      const event = await import(`file://${file.path}`);
      if (event.enable) super.on(file.name, (...args: unknown[]) => event.run(...args))
    }
  }

  async init(_path: string) {
    this.path = _path;
    this.loadEvents();
    await super.login(env["TOKEN"]);
  }
}

export default Amane;
