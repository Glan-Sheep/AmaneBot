import { dirname, sep } from "https://deno.land/std@0.158.0/path/mod.ts";
import Client from "./base/Amane.ts"

function startbot() {
  const Amane = new Client();

  Amane.loadSlashCommands(directory())
}

function directory(): string {
  const dir = `${dirname(import.meta.url)}${sep}`;
  return dir.replace(/\\/g, "/").replace("/tmp/", "/home/runner/Amane-Bot/").replace("file://","");
}

export default startbot;