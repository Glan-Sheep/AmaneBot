import { dirname, sep } from "https://deno.land/std@0.158.0/path/mod.ts";
import { expandGlob } from "https://deno.land/std@0.158.0/fs/mod.ts";

async function loadSlashCommands() {
  console.log(directory())
  for await (const file of expandGlob(`${directory()}commands/**/*.js`)) {
    console.log(file.name)
  }
}


function directory(): string {
  const dir = `${dirname(import.meta.url)}${sep}`;
  return dir.replace(/\\/g, "/").replace("/tmp/", "/home/runner/Amane-Bot/").replace("file://","");
}

export default loadSlashCommands;