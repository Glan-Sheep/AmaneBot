import { dirname, sep } from "https://deno.land/std@0.158.0/path/mod.ts";
import { expandGlob } from "https://deno.land/std@0.158.0/fs/mod.ts";
class Amane {
  constructor() {
  }

  get directory() {
    const dir = `${dirname(import.meta.url)}${sep}`;
    return dir.replace(/\\/g, "/").replace("/tmp/", "/home/runner/Amane-Bot/");
  }

  async loadSlashCommands() {
    for await (const file of expandGlob(`${this.directory}commands/**/*.js`)) {
      console.log(file);
    }
  }

  init() {
    console.log(this.directory);
    this.loadSlashCommands();
  }
}

export default Amane;